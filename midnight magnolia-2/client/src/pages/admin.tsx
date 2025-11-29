import { useState, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function AdminPanel() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [apiKey, setApiKey] = useState(() => {
    // Load API key from localStorage on mount
    return localStorage.getItem('mm_automation_key') || '';
  });
  const [automationStatus, setAutomationStatus] = useState<any>(null);
  const [isAutoFetched, setIsAutoFetched] = useState(false);

  // Check for admin access
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  // Redirect non-admin users
  useEffect(() => {
    if (!userLoading && (!user || user.user?.role !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "Admin access required to view this page",
        variant: "destructive",
      });
      setLocation('/dashboard');
    }
  }, [user, userLoading, setLocation, toast]);

  // Auto-fetch API key from server on mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('/api/automations/api-key');
        if (response.ok) {
          const data = await response.json();
          if (data.apiKey) {
            setApiKey(data.apiKey);
            localStorage.setItem('mm_automation_key', data.apiKey);
            setIsAutoFetched(true);
          }
        }
      } catch (error) {
        console.error('Failed to auto-fetch API key:', error);
      }
    };

    if (!apiKey) {
      fetchApiKey();
    }
  }, []);

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('mm_automation_key', apiKey);
    }
  }, [apiKey]);

  // Product automation form
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: 0,
    category: "tarot",
  });

  // Content automation form
  const [contentForm, setContentForm] = useState({
    title: "",
    content: "",
    type: "journal",
  });

  // Fetch automation status
  useEffect(() => {
    fetch("/api/automations/status")
      .then((res) => res.json())
      .then((data) => setAutomationStatus(data))
      .catch((err) => console.error("Failed to fetch automation status:", err));
  }, []);

  const triggerProductAutomation = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to trigger automations",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/automations/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          ...productForm,
          action: "create",
          metadata: {
            source: "admin-panel",
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Product Automation Triggered",
          description: `Successfully processed: ${data.data.title}`,
        });
      } else {
        throw new Error(data.error || "Failed to trigger automation");
      }
    } catch (error: any) {
      toast({
        title: "Automation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const triggerContentAutomation = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to trigger automations",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/automations/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          ...contentForm,
          tags: ["mystical", "automation"],
          metadata: {
            source: "admin-panel",
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Content Automation Triggered",
          description: `Successfully processed: ${data.data.title}`,
        });
      } else {
        throw new Error(data.error || "Failed to trigger automation");
      }
    } catch (error: any) {
      toast({
        title: "Automation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const triggerBackupAutomation = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to trigger automations",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/automations/backup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          type: "full",
          notify: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Backup Automation Triggered",
          description: "Backup process initiated successfully",
        });
      } else {
        throw new Error(data.error || "Failed to trigger backup");
      }
    } catch (error: any) {
      toast({
        title: "Backup Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Show loading state while checking access
  if (userLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" aria-label="Loading"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Only render if user is admin
  if (!user || user.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold mb-4">
                Admin Panel - Automation Control
              </h1>
              <p className="font-body text-muted-foreground">
                Manage Make.com webhooks and test automation endpoints
              </p>
            </div>

            {/* API Key Input */}
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">
                      API Key
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter your API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="bg-input border-border flex-1"
                        data-testid="input-api-key"
                      />
                      {apiKey && (
                        <Button
                          onClick={() => {
                            setApiKey('');
                            localStorage.removeItem('mm_automation_key');
                            toast({
                              title: "API Key Cleared",
                              description: "You'll need to re-enter it to use automations",
                            });
                          }}
                          variant="outline"
                          size="icon"
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {apiKey 
                        ? isAutoFetched 
                          ? "✓ API key auto-loaded from server (persists across sessions)"
                          : "✓ API key saved (persists across sessions)"
                        : "Use your SESSION_SECRET or AUTOMATION_API_KEY from environment variables"
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Automation Status */}
            {automationStatus && (
              <Card className="glass-card mb-8">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    Automation Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-accent">
                      Status:{" "}
                      <span className="text-accent font-bold">
                        {automationStatus.status}
                      </span>
                    </p>
                    <p className="font-accent text-sm text-muted-foreground">
                      Last checked:{" "}
                      {new Date(automationStatus.timestamp).toLocaleString()}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-accent font-semibold mb-2">
                        Available Endpoints:
                      </h4>
                      <ul className="space-y-1 font-mono text-sm">
                        {Object.entries(automationStatus.endpoints).map(
                          ([key, value]) => (
                            <li key={key} className="text-muted-foreground">
                              <span className="text-accent">{key}:</span>{" "}
                              {value as string}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Automation Tabs */}
            <Tabs defaultValue="product" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="product" className="font-accent">
                  <i className="fas fa-box mr-2"></i>
                  Product
                </TabsTrigger>
                <TabsTrigger value="content" className="font-accent">
                  <i className="fas fa-file-alt mr-2"></i>
                  Content
                </TabsTrigger>
                <TabsTrigger value="backup" className="font-accent">
                  <i className="fas fa-download mr-2"></i>
                  Backup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="product">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">
                      Product Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-title">Product Title</Label>
                        <Input
                          id="product-title"
                          placeholder="e.g., Midnight Tarot Deck"
                          value={productForm.title}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              title: e.target.value,
                            })
                          }
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-description">Description</Label>
                        <Input
                          id="product-description"
                          placeholder="Product description"
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              description: e.target.value,
                            })
                          }
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-price">
                          Price (in dollars)
                        </Label>
                        <Input
                          id="product-price"
                          type="number"
                          placeholder="49.99"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-category">Category</Label>
                        <select
                          id="product-category"
                          value={productForm.category}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full p-2 rounded bg-input border border-border"
                        >
                          <option value="tarot">Tarot</option>
                          <option value="journal">Journal</option>
                          <option value="art">Art</option>
                          <option value="oracle">Oracle</option>
                          <option value="crystal">Crystal</option>
                        </select>
                      </div>
                      <Button
                        onClick={triggerProductAutomation}
                        className="w-full btn-gold"
                        data-testid="button-trigger-product"
                      >
                        <i className="fas fa-bolt mr-2"></i>
                        Trigger Product Automation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">
                      Content Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="content-title">Content Title</Label>
                        <Input
                          id="content-title"
                          placeholder="e.g., Full Moon Ritual Guide"
                          value={contentForm.title}
                          onChange={(e) =>
                            setContentForm({
                              ...contentForm,
                              title: e.target.value,
                            })
                          }
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="content-body">Content</Label>
                        <textarea
                          id="content-body"
                          placeholder="Enter your content here..."
                          value={contentForm.content}
                          onChange={(e) =>
                            setContentForm({
                              ...contentForm,
                              content: e.target.value,
                            })
                          }
                          className="w-full p-2 rounded bg-input border border-border h-32"
                        />
                      </div>
                      <div>
                        <Label htmlFor="content-type">Content Type</Label>
                        <select
                          id="content-type"
                          value={contentForm.type}
                          onChange={(e) =>
                            setContentForm({
                              ...contentForm,
                              type: e.target.value,
                            })
                          }
                          className="w-full p-2 rounded bg-input border border-border"
                        >
                          <option value="journal">Journal</option>
                          <option value="affirmation">Affirmation</option>
                          <option value="prompt">Prompt</option>
                          <option value="article">Article</option>
                        </select>
                      </div>
                      <Button
                        onClick={triggerContentAutomation}
                        className="w-full btn-gold"
                        data-testid="button-trigger-content"
                      >
                        <i className="fas fa-bolt mr-2"></i>
                        Trigger Content Automation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backup">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">
                      Backup Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="font-body text-muted-foreground">
                        Trigger a backup automation to save current state of the
                        application. This will notify the configured Make.com
                        webhook about the backup request.
                      </p>
                      <div className="p-4 rounded bg-background/50 border border-border">
                        <h4 className="font-accent font-semibold mb-2">
                          Backup Types:
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>
                            • <span className="text-accent">Full:</span>{" "}
                            Complete application backup
                          </li>
                          <li>
                            • <span className="text-accent">Incremental:</span>{" "}
                            Changes since last backup
                          </li>
                          <li>
                            • <span className="text-accent">Users:</span> User
                            data only
                          </li>
                          <li>
                            • <span className="text-accent">Content:</span>{" "}
                            Content and products only
                          </li>
                        </ul>
                      </div>
                      <Button
                        onClick={triggerBackupAutomation}
                        className="w-full btn-gold"
                        data-testid="button-trigger-backup"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Trigger Full Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Webhook Configuration Info */}
            <Card className="glass-card mt-8">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Make.com Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="font-body text-muted-foreground">
                    To connect with Make.com, add these environment variables:
                  </p>
                  <pre className="p-4 rounded bg-background/50 border border-border text-sm font-mono">
                    {`MAKE_WEBHOOK_PRODUCT=https://hook.make.com/...
MAKE_WEBHOOK_CONTENT=https://hook.make.com/...
MAKE_WEBHOOK_BACKUP=https://hook.make.com/...
AUTOMATION_API_KEY=your-secret-key`}
                  </pre>
                  <p className="font-body text-sm text-muted-foreground">
                    Use the provided <code>make_config.json</code> file to
                    configure your Make.com app.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
