import express from 'express';
import bodyParser from 'body-parser';
import { setWebhookRoutes } from './routes/webhookRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming webhook requests
app.use(bodyParser.json());

// Set up webhook routes
setWebhookRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});