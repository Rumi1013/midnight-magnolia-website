# README.md for Stripe Webhook Project

# Stripe Webhook Project

This project is designed to handle Stripe webhook events for the Midnight Magnolia website. It sets up an Express server that listens for incoming webhook requests from Stripe and processes them accordingly.

## Project Structure

```
stripe-webhook
├── src
│   ├── server.ts
│   ├── controllers
│   │   └── webhookController.ts 
│   ├── routes
│   │   └── webhookRoutes.ts
│   ├── config
│   │   └── stripe.ts
│   └── types
│       └── index.ts
├── package.json
├── .env
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd stripe-webhook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your Stripe secret key and any other necessary configuration settings.

4. **Run the server:**
   ```bash
   npm start
   ```

## Usage

Once the server is running, it will listen for incoming webhook events from Stripe. Ensure that your Stripe account is configured to send webhook events to the correct endpoint.

## License

This project is licensed under the MIT License.