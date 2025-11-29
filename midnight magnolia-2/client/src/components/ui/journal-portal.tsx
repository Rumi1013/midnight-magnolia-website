import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function JournalPortal() {
  const { toast } = useToast();
  const [journalIntention, setJournalIntention] = useState("");
  const [affirmationText, setAffirmationText] = useState("");
  const [journalPrompt, setJournalPrompt] = useState("");
  const [generatedJournal, setGeneratedJournal] = useState<any>(null);

  // Check if user is authenticated and has proper access
  const { data: user } = useQuery<{ user: { id: string; email: string; username: string; role: string } }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  const hasAccess = user?.user && user.user.role !== 'seeker';

  // Generate affirmation mutation
  const generateAffirmationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/affirmation");
      return response.json();
    },
    onSuccess: (data) => {
      setAffirmationText(data.affirmation);
      toast({
        title: "Affirmation Generated",
        description: "Your daily affirmation is ready.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Generate journal prompt mutation
  const generatePromptMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/journal-prompt");
      return response.json();
    },
    onSuccess: (data) => {
      setJournalPrompt(data.prompt);
      toast({
        title: "Prompt Generated", 
        description: "Your reflective prompt is ready.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Generate full journal entry mutation
  const generateJournalMutation = useMutation({
    mutationFn: async (intention: string) => {
      const response = await apiRequest("POST", "/api/create-journal", { intention });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedJournal(data);
      toast({
        title: "Journal Entry Created",
        description: "Your sacred reflection is ready.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Save to Notion mutation
  const saveToNotionMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const response = await apiRequest("POST", "/api/upload-content", { entryId });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Saved Successfully",
        description: data.notionPageId ? "Entry saved to Notion workspace." : "Entry saved locally.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Save Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateAffirmation = () => {
    if (!hasAccess) {
      toast({
        title: "Membership Required",
        description: "Creator or Mystic membership needed for AI features.",
        variant: "destructive",
      });
      return;
    }
    generateAffirmationMutation.mutate();
  };

  const handleGeneratePrompt = () => {
    if (!hasAccess) {
      toast({
        title: "Membership Required", 
        description: "Creator or Mystic membership needed for AI features.",
        variant: "destructive",
      });
      return;
    }
    generatePromptMutation.mutate();
  };

  const handleGenerateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAccess) {
      toast({
        title: "Membership Required",
        description: "Creator or Mystic membership needed for AI features.",
        variant: "destructive",
      });
      return;
    }
    if (!journalIntention.trim()) {
      toast({
        title: "Intention Required",
        description: "Please describe your current intention or state.",
        variant: "destructive",
      });
      return;
    }
    generateJournalMutation.mutate(journalIntention);
  };

  const handleSaveToNotion = () => {
    if (!generatedJournal?.id) {
      toast({
        title: "No Entry to Save",
        description: "Generate a journal entry first.",
        variant: "destructive",
      });
      return;
    }
    saveToNotionMutation.mutate(generatedJournal.id);
  };

  return (
    <section id="journal" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Journal Portal</h2>
            <p className="font-body text-xl text-muted-foreground">
              AI-powered reflective writing for conscious creators
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Daily Affirmation Generator */}
              <Card className="border border-border rounded-xl">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-semibold flex items-center">
                    <i className="fas fa-sun text-accent mr-3 magnolia-icon"></i>
                    Daily Affirmation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-muted-foreground mb-6">
                    Generate a personalized affirmation to guide your creative practice today.
                  </p>
                  <Button
                    onClick={handleGenerateAffirmation}
                    disabled={generateAffirmationMutation.isPending}
                    className="w-full btn-gold py-3 rounded-full text-accent-foreground font-accent font-semibold"
                    data-testid="button-generate-affirmation"
                  >
                    {generateAffirmationMutation.isPending ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-wand-magic-sparkles mr-2"></i>
                        Generate Affirmation
                      </>
                    )}
                  </Button>
                  
                  {affirmationText && (
                    <div className="mt-6 p-4 bg-muted/20 rounded-lg" data-testid="text-affirmation-result">
                      <p className="font-body italic text-center">
                        "{affirmationText}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Reflective Journal Prompt */}
              <Card className="border border-border rounded-xl">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-semibold flex items-center">
                    <i className="fas fa-feather text-accent mr-3 magnolia-icon"></i>
                    Reflective Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-muted-foreground mb-6">
                    Receive a thought-provoking journal prompt to deepen your spiritual practice.
                  </p>
                  <Button
                    onClick={handleGeneratePrompt}
                    disabled={generatePromptMutation.isPending}
                    className="w-full btn-gold py-3 rounded-full text-accent-foreground font-accent font-semibold"
                    data-testid="button-generate-prompt"
                  >
                    {generatePromptMutation.isPending ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-book-open mr-2"></i>
                        Generate Prompt
                      </>
                    )}
                  </Button>
                  
                  {journalPrompt && (
                    <div className="mt-6 p-4 bg-muted/20 rounded-lg" data-testid="text-prompt-result">
                      <p className="font-body italic text-center">
                        "{journalPrompt}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Full Journal Entry */}
            <Card className="border border-accent rounded-xl">
              <CardHeader>
                <CardTitle className="font-display text-2xl font-semibold flex items-center">
                  <i className="fas fa-scroll text-accent mr-3 magnolia-icon"></i>
                  AI-Powered Journal Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-muted-foreground mb-6">
                  Describe your current state or intention, and let our AI guide you through a reflective writing journey.
                </p>
                
                <form onSubmit={handleGenerateJournal} className="space-y-4">
                  <div>
                    <Label className="font-accent text-sm uppercase tracking-wide mb-2 block">
                      Your Intention
                    </Label>
                    <Textarea
                      value={journalIntention}
                      onChange={(e) => setJournalIntention(e.target.value)}
                      className="bg-input text-foreground border border-border rounded-lg font-body focus:ring-2 focus:ring-ring resize-none"
                      rows={4}
                      placeholder="I want to explore my creative blocks and find clarity in my artistic vision..."
                      data-testid="textarea-journal-intention"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={generateJournalMutation.isPending}
                    className="w-full btn-gold py-3 rounded-full text-accent-foreground font-accent font-semibold"
                    data-testid="button-generate-journal"
                  >
                    {generateJournalMutation.isPending ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sparkles mr-2"></i>
                        Create Journal Entry
                      </>
                    )}
                  </Button>
                </form>

                {/* Generated Journal Output */}
                {generatedJournal && (
                  <div className="mt-6 p-6 bg-muted/20 rounded-lg" data-testid="text-generated-journal">
                    <h4 className="font-display text-xl font-semibold mb-4">Your Sacred Reflection</h4>
                    <div className="font-body text-muted-foreground space-y-3 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ 
                        __html: generatedJournal.content.replace(/\n/g, '<br />') 
                      }} />
                    </div>
                    <Button
                      onClick={handleSaveToNotion}
                      disabled={saveToNotionMutation.isPending}
                      variant="outline"
                      className="mt-4 text-accent border-accent hover:bg-accent hover:text-accent-foreground"
                      data-testid="button-save-to-notion"
                    >
                      {saveToNotionMutation.isPending ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save mr-2"></i>
                          Save to Notion
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Access Note */}
            <div className="mt-8 p-4 border border-secondary/50 rounded-lg bg-secondary/10">
              <p className="font-accent text-sm text-center">
                <i className="fas fa-info-circle text-secondary mr-2"></i>
                {hasAccess 
                  ? `Journal portal active for ${user?.user?.role} members`
                  : "Journal portal requires Creator or Mystic membership"
                }
              </p>
              {!hasAccess && (
                <div className="text-center mt-3">
                  <a 
                    href="/tiers" 
                    className="text-accent hover:underline font-accent text-sm"
                    data-testid="link-upgrade-membership"
                  >
                    Upgrade your membership →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
