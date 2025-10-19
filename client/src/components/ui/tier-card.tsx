import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface TierCardProps {
  tier: {
    name: string;
    price: string;
    description: string;
    icon: string;
    features: string[];
    unavailable?: string[];
    buttonText: string;
    popular: boolean;
  };
}

export default function TierCard({ tier }: TierCardProps) {
  const [, setLocation] = useLocation();

  const handleSelectTier = () => {
    if (tier.name.toLowerCase() === "seeker") {
      setLocation("/signup");
    } else {
      setLocation(`/subscribe/${tier.name.toLowerCase()}`);
    }
  };

  return (
    <div className={`glass-card rounded-2xl p-8 transition-all duration-300 relative ${
      tier.popular 
        ? 'border-2 border-accent' 
        : 'border border-border hover:border-accent'
    }`}>
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full font-accent text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <i className={`${tier.icon} ${tier.popular ? 'text-accent' : 'text-secondary'} text-4xl mb-4`}></i>
        <h3 className="font-display text-3xl font-bold mb-2" data-testid={`text-tier-name-${tier.name.toLowerCase()}`}>
          {tier.name}
        </h3>
        <div className="text-5xl font-display font-bold text-accent mb-2" data-testid={`text-tier-price-${tier.name.toLowerCase()}`}>
          {tier.price}
        </div>
        <p className="font-accent text-sm text-muted-foreground">{tier.description}</p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-center font-body">
            <i className={`fas fa-check ${tier.popular ? 'text-accent' : 'text-secondary'} mr-3`}></i>
            <span>{feature}</span>
          </li>
        ))}
        {tier.unavailable?.map((feature, index) => (
          <li key={index} className="flex items-center font-body text-muted-foreground">
            <i className="fas fa-times text-muted mr-3"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        onClick={handleSelectTier}
        className={`w-full py-3 rounded-full font-accent font-semibold transition-all duration-300 ${
          tier.popular
            ? 'btn-gold text-accent-foreground'
            : 'border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground'
        }`}
        variant={tier.popular ? "default" : "outline"}
        data-testid={`button-select-tier-${tier.name.toLowerCase()}`}
      >
        {tier.buttonText}
      </Button>
    </div>
  );
}
