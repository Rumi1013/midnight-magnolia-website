import { Router } from 'express';
import { WebhookController } from '../controllers/webhookController';

const router = Router();
const webhookController = new WebhookController();

export function setWebhookRoutes() {
    router.post('/webhook', webhookController.handleWebhook.bind(webhookController));
    return router;
}