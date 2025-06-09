import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface WebhookJob {
  id?: number
  webhookTopic: string
  shopifyId: string
  payload: any
  status: "pending" | "processing" | "completed" | "failed" | "dead_letter"
  retryCount: number
  maxRetries: number
  nextRetryAt?: Date
  lastError?: string
  createdAt: Date
  updatedAt: Date
  processedAt?: Date
}

export class WebhookQueue {
  private static readonly MAX_RETRIES = 5
  private static readonly RETRY_DELAYS = [1000, 5000, 15000, 60000, 300000] // 1s, 5s, 15s, 1m, 5m

  // Add webhook job to queue
  static async enqueue(
    topic: string,
    shopifyId: string,
    payload: any,
    maxRetries: number = this.MAX_RETRIES,
  ): Promise<WebhookJob> {
    const result = await sql`
      INSERT INTO webhook_queue (
        webhook_topic, shopify_id, payload, status, retry_count, max_retries, created_at, updated_at
      ) VALUES (
        ${topic}, ${shopifyId}, ${JSON.stringify(payload)}, 'pending', 0, ${maxRetries}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
      RETURNING *
    `
    return result[0] as WebhookJob
  }

  // Get next pending job
  static async dequeue(): Promise<WebhookJob | null> {
    const result = await sql`
      UPDATE webhook_queue 
      SET status = 'processing', updated_at = CURRENT_TIMESTAMP
      WHERE id = (
        SELECT id FROM webhook_queue 
        WHERE status = 'pending' 
        AND (next_retry_at IS NULL OR next_retry_at <= CURRENT_TIMESTAMP)
        ORDER BY created_at ASC 
        LIMIT 1
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *
    `
    return (result[0] as WebhookJob) || null
  }

  // Mark job as completed
  static async markCompleted(jobId: number): Promise<void> {
    await sql`
      UPDATE webhook_queue 
      SET status = 'completed', processed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${jobId}
    `
  }

  // Mark job as failed and schedule retry
  static async markFailed(jobId: number, error: string): Promise<WebhookJob | null> {
    const job = await this.getJob(jobId)
    if (!job) return null

    const newRetryCount = job.retryCount + 1
    const shouldRetry = newRetryCount < job.maxRetries

    if (shouldRetry) {
      const delay = this.RETRY_DELAYS[Math.min(newRetryCount - 1, this.RETRY_DELAYS.length - 1)]
      const nextRetryAt = new Date(Date.now() + delay)

      const result = await sql`
        UPDATE webhook_queue 
        SET 
          status = 'pending',
          retry_count = ${newRetryCount},
          next_retry_at = ${nextRetryAt},
          last_error = ${error},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${jobId}
        RETURNING *
      `
      return result[0] as WebhookJob
    } else {
      // Move to dead letter queue
      const result = await sql`
        UPDATE webhook_queue 
        SET 
          status = 'dead_letter',
          retry_count = ${newRetryCount},
          last_error = ${error},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${jobId}
        RETURNING *
      `

      // Send alert for dead letter
      await this.sendDeadLetterAlert(result[0] as WebhookJob)
      return result[0] as WebhookJob
    }
  }

  // Get job by ID
  static async getJob(jobId: number): Promise<WebhookJob | null> {
    const result = await sql`
      SELECT * FROM webhook_queue WHERE id = ${jobId}
    `
    return (result[0] as WebhookJob) || null
  }

  // Get failed jobs for manual retry
  static async getFailedJobs(limit = 50): Promise<WebhookJob[]> {
    const result = await sql`
      SELECT * FROM webhook_queue 
      WHERE status IN ('failed', 'dead_letter')
      ORDER BY updated_at DESC 
      LIMIT ${limit}
    `
    return result as WebhookJob[]
  }

  // Manually retry a failed job
  static async retryJob(jobId: number): Promise<WebhookJob | null> {
    const result = await sql`
      UPDATE webhook_queue 
      SET 
        status = 'pending',
        next_retry_at = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${jobId} AND status IN ('failed', 'dead_letter')
      RETURNING *
    `
    return (result[0] as WebhookJob) || null
  }

  // Get queue statistics
  static async getQueueStats(): Promise<any> {
    const result = await sql`
      SELECT 
        status,
        COUNT(*) as count,
        webhook_topic,
        AVG(retry_count) as avg_retries
      FROM webhook_queue 
      WHERE created_at >= NOW() - INTERVAL '24 hours'
      GROUP BY status, webhook_topic
      ORDER BY webhook_topic, status
    `
    return result
  }

  // Clean up old completed jobs
  static async cleanup(olderThanDays = 7): Promise<number> {
    const result = await sql`
      DELETE FROM webhook_queue 
      WHERE status = 'completed' 
      AND processed_at < NOW() - INTERVAL '${olderThanDays} days'
    `
    return result.length
  }

  // Send alert for dead letter jobs
  private static async sendDeadLetterAlert(job: WebhookJob): Promise<void> {
    console.error("Webhook job moved to dead letter queue:", {
      id: job.id,
      topic: job.webhookTopic,
      shopifyId: job.shopifyId,
      retryCount: job.retryCount,
      lastError: job.lastError,
    })

    // Send notification via Make.com
    if (process.env.MAKE_WEBHOOK_URL) {
      try {
        await fetch(process.env.MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "webhook_dead_letter",
            job: {
              id: job.id,
              topic: job.webhookTopic,
              shopifyId: job.shopifyId,
              retryCount: job.retryCount,
              lastError: job.lastError,
            },
          }),
        })
      } catch (error) {
        console.error("Failed to send dead letter alert:", error)
      }
    }
  }
}
