import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { groq } from "@ai-sdk/groq"
import { perplexity } from "@ai-sdk/perplexity"
import { z } from "zod"

const chatRequestSchema = z.object({
  prompt: z.string(),
  modelProvider: z.enum(["openai", "groq", "perplexity"]),
  // You could add specific model names here too, e.g., 'llama3-8b-8192' for groq
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = chatRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ success: false, error: validation.error.format() }, { status: 400 })
    }

    const { prompt, modelProvider } = validation.data

    let model
    switch (modelProvider) {
      case "openai":
        if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set.")
        model = openai("gpt-4o") // Or your preferred OpenAI model
        break
      case "groq":
        if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY is not set.")
        model = groq("llama3-8b-8192") // Groq model, e.g., Llama3 8b
        break
      case "perplexity":
        if (!process.env.PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY is not set.")
        model = perplexity("llama-3-sonar-small-32k-chat") // Perplexity model
        break
      default:
        return NextResponse.json({ success: false, error: "Invalid model provider" }, { status: 400 })
    }

    const { text, usage, finishReason, toolCalls, toolResults } = await generateText({
      model: model,
      prompt: `
        You are an AI assistant for "Midnight Magnolia", a Southern Gothic wellness brand.
        Your voice is gentle, poetic, trauma-informed, never corporate or rushed.
        Your audience includes Black women, spoonies (people with chronic illness), spiritual entrepreneurs, and creative healers.
        Incorporate themes of healing, ancestral wisdom, and gentle productivity.
        Use mystical language, referencing moon phases, seasons, and nature where appropriate.
        Current user prompt: ${prompt}
      `,
      // system: "You are a helpful AI assistant for Midnight Magnolia..." // Alternative way to set system prompt
    })

    return NextResponse.json({
      success: true,
      generatedText: text,
      usage,
      finishReason,
      toolCalls,
      toolResults,
    })
  } catch (error: any) {
    console.error("AI Chat API Error:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to generate content" }, { status: 500 })
  }
}
