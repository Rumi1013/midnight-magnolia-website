import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const SubscribeForm = ({ tier }: { tier: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/dashboard',
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome to the Collective!",
        description: `You are now a ${tier} member.`,
      });
      setLocation('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe}
        className="w-full btn-gold py-3 rounded-full text-accent-foreground font-accent font-semibold"
        data-testid="button-confirm-payment"
      >
        {tier === 'creator' ? 'Start Creating - $29/mo' : 'Unlock All - $99/mo'}
      </Button>
    </form>
  );
};

export default function Subscribe() {
  const params = useParams();
  const tier = params.tier || 'creator';
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Create subscription as soon as the page loads
    apiRequest("POST", "/api/create-subscription", { tier })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: "Already Subscribed",
            description: "You already have an active subscription.",
          });
          setLocation('/dashboard');
        }
      })
      .catch((error) => {
        toast({
          title: "Subscription Error",
          description: "Please sign in to subscribe.",
          variant: "destructive",
        });
        setLocation('/dashboard');
      });
  }, [tier, toast, setLocation]);

  const tierInfo = {
    creator: {
      name: "Creator",
      price: "$29/mo",
      description: "For digital mystics",
      features: [
        "AI journal generation (50/mo)",
        "Daily affirmations",
        "Creator dashboard access",
        "20% off all products"
      ]
    },
    mystic: {
      name: "Mystic",
      price: "$99/mo",
      description: "Full manifestation",
      features: [
        "Unlimited AI generations",
        "1-on-1 coaching session",
        "Notion template library",
        "Exclusive product releases"
      ]
    }
  };

  const currentTier = tierInfo[tier as keyof typeof tierInfo] || tierInfo.creator;

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Join as a <span className="text-accent">{currentTier.name}</span>
              </h1>
              <p className="font-body text-xl text-muted-foreground">
                {currentTier.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tier Summary */}
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-center">
                    {currentTier.name} Membership
                  </CardTitle>
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold text-accent mb-2">
                      {currentTier.price}
                    </div>
                    <p className="font-accent text-sm text-muted-foreground">
                      {currentTier.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentTier.features.map((feature, index) => (
                      <li key={index} className="flex items-center font-body">
                        <i className="fas fa-check text-accent mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <p className="font-body text-sm text-center">
                      <i className="fas fa-shield-alt text-accent mr-2"></i>
                      Cancel anytime • 30-day money-back guarantee
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card className="glass-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <SubscribeForm tier={currentTier.name.toLowerCase()} />
                  
                  <div className="mt-6 text-center">
                    <p className="font-body text-sm text-muted-foreground">
                      <i className="fas fa-lock text-accent mr-2"></i>
                      Secure payments powered by Stripe
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
