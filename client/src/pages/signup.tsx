import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Please select your role"),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupForm) => {
      const response = await apiRequest("POST", "/api/auth/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Midnight Magnolia!",
        description: "Your account has been created successfully.",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupForm) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Join Our Sacred Circle</h1>
              <p className="font-body text-xl text-muted-foreground">
                Begin your journey as a conscious creator
              </p>
              <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-accent text-sm uppercase tracking-wide">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Luna"
                      data-testid="input-firstName"
                      className="bg-input border-border font-body"
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-accent text-sm uppercase tracking-wide">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Magnolia"
                      data-testid="input-lastName"
                      className="bg-input border-border font-body"
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="font-accent text-sm uppercase tracking-wide">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="luna@midnightmagnolia.com"
                    data-testid="input-email"
                    className="bg-input border-border font-body"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="username" className="font-accent text-sm uppercase tracking-wide">
                    Username
                  </Label>
                  <Input
                    id="username"
                    {...register("username")}
                    placeholder="lunamagnolia"
                    data-testid="input-username"
                    className="bg-input border-border font-body"
                  />
                  {errors.username && (
                    <p className="text-destructive text-sm mt-1">{errors.username.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="font-accent text-sm uppercase tracking-wide">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    data-testid="input-password"
                    className="bg-input border-border font-body"
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <Label className="font-accent text-sm uppercase tracking-wide">
                    I am a...
                  </Label>
                  <Select onValueChange={(value) => setValue("role", value)}>
                    <SelectTrigger className="bg-input border-border font-body" data-testid="select-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creator">Creator / Artist</SelectItem>
                      <SelectItem value="spiritual">Spiritual Practitioner</SelectItem>
                      <SelectItem value="writer">Writer / Poet</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-destructive text-sm mt-1">{errors.role.message}</p>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={watch("acceptTerms")}
                    onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
                    data-testid="checkbox-terms"
                  />
                  <Label htmlFor="terms" className="font-body text-sm text-muted-foreground leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy. I wish to receive updates about Midnight Magnolia products and events.
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-destructive text-sm">{errors.acceptTerms.message}</p>
                )}

                <Button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="w-full btn-gold py-4 rounded-full text-accent-foreground font-accent font-semibold text-lg"
                  data-testid="button-signup"
                >
                  {signupMutation.isPending ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sparkles mr-2"></i>
                      Create My Account
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="font-body text-sm text-muted-foreground">
                  Already have an account? {" "}
                  <a href="/dashboard" className="text-accent hover:underline">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
