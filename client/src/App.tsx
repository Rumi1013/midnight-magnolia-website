import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Shop from "@/pages/shop";
import Tiers from "@/pages/tiers";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Subscribe from "@/pages/subscribe";
import AdminPanel from "@/pages/admin";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/shop" component={Shop} />
      <Route path="/tiers" component={Tiers} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/subscribe/:tier" component={Subscribe} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </Elements>
    </QueryClientProvider>
  );
}

export default App;
