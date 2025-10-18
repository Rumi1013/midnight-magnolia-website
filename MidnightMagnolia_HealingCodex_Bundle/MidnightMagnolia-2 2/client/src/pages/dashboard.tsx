import { useState, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import JournalPortal from "@/components/ui/journal-portal";
import ContentHistory from "@/components/ui/content-history";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const { data: user, isLoading } = useQuery<{ user: { id: string; email: string; username: string; role: string } }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  const { data: journalEntries } = useQuery<any[]>({
    queryKey: ['/api/journal-entries'],
    enabled: !!user,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      queryClient.invalidateQueries({ queryKey: ['/api/journal-entries'] });
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/auth/logout");
      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const recentActivity = journalEntries?.slice(0, 5).map((entry: any) => ({
    text: `Completed ${entry.type}: "${entry.title || 'Untitled'}"`,
    time: new Date(entry.createdAt).toLocaleDateString(),
  })) || [];

  // Calculate stats
  const totalEntries = journalEntries?.length || 0;
  const aiGenerations = journalEntries?.filter((e: any) => e.metadata?.generatedByAI).length || 0;
  const currentStreak = Math.floor(Math.random() * 30) + 1; // Mock streak for now
  const membershipTier = user?.user?.role || 'seeker';

  if (isLoading) {
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
      
      {!user ? (
        // Login Required View
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="glass-card rounded-2xl p-8 text-center">
                <i className="fas fa-lock text-accent text-5xl mb-6 magnolia-icon"></i>
                <h2 className="font-display text-3xl font-bold mb-4">Creator Dashboard</h2>
                <p className="font-body text-muted-foreground mb-8">
                  Sign in to access your personalized creator portal with AI tools, content management, and analytics.
                </p>
                
                <form onSubmit={handleLogin} className="space-y-4 mb-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="bg-input border-border font-accent"
                      data-testid="input-email"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="bg-input border-border font-accent"
                      data-testid="input-password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full btn-gold py-3 rounded-full text-accent-foreground font-accent font-semibold"
                    data-testid="button-login"
                  >
                    {loginMutation.isPending ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
                
                <div className="text-center">
                  <a href="/signup" className="text-accent font-accent hover:underline">
                    Create an account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Authenticated Dashboard View
        <>
          <div className="pt-20 pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="font-display text-4xl font-bold mb-2">
                      Welcome back, <span className="text-accent">{user.user?.username || "Creator"}</span>
                    </h2>
                    <p className="font-body text-muted-foreground">
                      Your creative sanctuary awaits
                      {user.user?.role === 'admin' && (
                        <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">
                          <i className="fas fa-shield-halved mr-1"></i>
                          Admin Access
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {user.user?.role === 'admin' && (
                      <Button
                        onClick={() => setLocation('/admin')}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        data-testid="button-admin-panel"
                      >
                        <i className="fas fa-shield-halved mr-2"></i>
                        Admin Panel
                      </Button>
                    )}
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      data-testid="button-logout"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Sign Out
                    </Button>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <Card className="glass-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-book text-accent text-2xl"></i>
                        <span className="font-display text-3xl font-bold" data-testid="stat-journal-entries">
                          {totalEntries}
                        </span>
                      </div>
                      <p className="font-accent text-sm text-muted-foreground">Journal Entries</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-wand-magic-sparkles text-accent text-2xl"></i>
                        <span className="font-display text-3xl font-bold" data-testid="stat-ai-generations">
                          {aiGenerations}
                        </span>
                      </div>
                      <p className="font-accent text-sm text-muted-foreground">AI Generations</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-fire text-accent text-2xl"></i>
                        <span className="font-display text-3xl font-bold" data-testid="stat-streak">
                          {currentStreak}
                        </span>
                      </div>
                      <p className="font-accent text-sm text-muted-foreground">Day Streak</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-crown text-accent text-2xl"></i>
                        <span className="font-display text-lg font-bold text-accent capitalize" data-testid="stat-tier">
                          {membershipTier}
                        </span>
                      </div>
                      <p className="font-accent text-sm text-muted-foreground">Membership Tier</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 glass-card">
                    <TabsTrigger value="overview" className="font-accent">
                      <i className="fas fa-home mr-2"></i>
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="create" className="font-accent">
                      <i className="fas fa-wand-magic-sparkles mr-2"></i>
                      Create
                    </TabsTrigger>
                    <TabsTrigger value="history" className="font-accent">
                      <i className="fas fa-clock-rotate-left mr-2"></i>
                      History
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Recent Activity */}
                      <Card className="glass-card border-border">
                        <CardHeader>
                          <CardTitle className="font-display text-2xl">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {recentActivity.length > 0 ? (
                            <div className="space-y-3">
                              {recentActivity.map((activity: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/30"
                                  data-testid={`activity-item-${index}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <i className="fas fa-circle-check text-accent"></i>
                                    <span className="font-body text-sm">{activity.text}</span>
                                  </div>
                                  <span className="font-accent text-xs text-muted-foreground">
                                    {activity.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6">
                              <i className="fas fa-moon text-accent text-3xl mb-3 opacity-50"></i>
                              <p className="font-body text-muted-foreground">
                                Your journey begins here...
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <Card className="glass-card border-border">
                        <CardHeader>
                          <CardTitle className="font-display text-2xl">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Button
                              className="w-full btn-gold py-3 justify-start"
                              onClick={() => {
                                const tabTrigger = document.querySelector('[value="create"]') as HTMLButtonElement;
                                tabTrigger?.click();
                              }}
                              data-testid="button-new-journal"
                            >
                              <i className="fas fa-book mr-3"></i>
                              New Journal Entry
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full py-3 justify-start border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                              data-testid="button-generate-affirmation"
                            >
                              <i className="fas fa-heart mr-3"></i>
                              Generate Daily Affirmation
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full py-3 justify-start border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                              data-testid="button-tarot-reading"
                            >
                              <i className="fas fa-sun mr-3"></i>
                              Request Tarot Reading
                            </Button>
                            {membershipTier === 'mystic' && (
                              <Button
                                variant="outline"
                                className="w-full py-3 justify-start border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-purple-950"
                                data-testid="button-private-coaching"
                              >
                                <i className="fas fa-crown mr-3"></i>
                                Private AI Coaching Session
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Tier Benefits */}
                    <Card className="glass-card border-border">
                      <CardHeader>
                        <CardTitle className="font-display text-2xl">
                          Your {membershipTier === 'seeker' ? 'Seeker' : membershipTier === 'creator' ? 'Creator' : 'Mystic'} Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          {membershipTier === 'seeker' && (
                            <>
                              <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                                <i className="fas fa-feather text-accent text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Basic Journal</h4>
                                <p className="font-body text-xs text-muted-foreground">Write and save entries</p>
                              </div>
                              <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                                <i className="fas fa-sun text-accent text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Daily Prompts</h4>
                                <p className="font-body text-xs text-muted-foreground">Inspiration for reflection</p>
                              </div>
                              <div className="p-4 rounded-lg bg-background/50 border border-border/30 opacity-50">
                                <i className="fas fa-lock text-muted-foreground text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Upgrade for AI</h4>
                                <p className="font-body text-xs text-muted-foreground">Unlock magical tools</p>
                              </div>
                            </>
                          )}
                          {membershipTier === 'creator' && (
                            <>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30">
                                <i className="fas fa-wand-magic-sparkles text-accent text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">AI Journal Generation</h4>
                                <p className="font-body text-xs text-muted-foreground">5 generations per day</p>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30">
                                <i className="fas fa-heart text-accent text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Daily Affirmations</h4>
                                <p className="font-body text-xs text-muted-foreground">Personalized mantras</p>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30">
                                <i className="fas fa-chart-line text-accent text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Creator Dashboard</h4>
                                <p className="font-body text-xs text-muted-foreground">Analytics & insights</p>
                              </div>
                            </>
                          )}
                          {membershipTier === 'mystic' && (
                            <>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-600/10 border border-purple-400/30">
                                <i className="fas fa-infinity text-purple-400 text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Unlimited AI</h4>
                                <p className="font-body text-xs text-muted-foreground">No generation limits</p>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-600/10 border border-purple-400/30">
                                <i className="fas fa-crown text-purple-400 text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">AI Coaching</h4>
                                <p className="font-body text-xs text-muted-foreground">Personal guidance</p>
                              </div>
                              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-600/10 border border-purple-400/30">
                                <i className="fas fa-star text-purple-400 text-xl mb-2"></i>
                                <h4 className="font-accent font-semibold mb-1">Exclusive Content</h4>
                                <p className="font-body text-xs text-muted-foreground">Premium resources</p>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="create">
                    <JournalPortal />
                  </TabsContent>

                  <TabsContent value="history">
                    <ContentHistory 
                      entries={journalEntries || []} 
                      onUpload={(entryId) => {
                        toast({
                          title: "Saving to Notion",
                          description: "Your content is being uploaded to your Notion workspace...",
                        });
                        // TODO: Implement Notion upload
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}