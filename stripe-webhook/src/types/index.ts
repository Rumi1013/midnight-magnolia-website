export interface StripeWebhookEvent {
    id: string;
    object: string;
    created: number;
    type: string;
    data: {
        object: any; // You can define a more specific type based on the event type
    };
}

export interface WebhookResponse {
    received: boolean;
    status: string;
}