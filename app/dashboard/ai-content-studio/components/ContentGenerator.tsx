"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast" // Assuming you have a toast hook

type ModelProvider = "openai" | "groq" | "perplexity"

export default function ContentGenerator() {
  const [contentType, setContentType] = useState("blog_post")
  const [prompt, setPrompt] = useState("")
  const [modelProvider, setModelProvider] = useState<ModelProvider>("openai")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setGeneratedContent("")

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `For a ${contentType.replace("_", " ")}: ${prompt}`, modelProvider }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate content from API.")
      }

      setGeneratedContent(data.generatedText)
      toast({
        title: "Content Generated",
        description: "Your wisdom has been woven.",
        variant: "default",
        className: "bg-sage-green text-midnight-blue",
      })
    } catch (error: any) {
      console.error("Content generation error:", error)
      setGeneratedContent(`Something went wrong, let's try again. Error: ${error.message}`)
      toast({
        title: "Generation Failed",
        description: error.message || "Could not generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-midnight-blue-darker border-warm-gray text-magnolia-white shadow-gentle">
      <CardHeader>
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-rich-gold" />
          <CardTitle className="font-playfair text-2xl text-rich-gold">Universal Content Generator</CardTitle>
        </div>
        <CardDescription className="font-lora text-warm-gray">
          Craft compelling text for various platforms. Enter your prompt, select the content type and AI model, then let
          the AI assist you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contentType" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
              Content Type
            </label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-full bg-midnight-blue border-warm-gray/50 text-magnolia-white font-montserrat">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent className="bg-midnight-blue-darker border-warm-gray text-magnolia-white">
                <SelectItem value="blog_post" className="font-montserrat hover:bg-rich-gold/20">
                  Blog Post
                </SelectItem>
                <SelectItem value="social_media_caption" className="font-montserrat hover:bg-rich-gold/20">
                  Social Media Caption
                </SelectItem>
                <SelectItem value="email_copy" className="font-montserrat hover:bg-rich-gold/20">
                  Email Copy
                </SelectItem>
                <SelectItem value="product_description_shopify" className="font-montserrat hover:bg-rich-gold/20">
                  Shopify Product Description
                </SelectItem>
                <SelectItem value="product_description_etsy" className="font-montserrat hover:bg-rich-gold/20">
                  Etsy Product Description
                </SelectItem>
                <SelectItem value="patreon_post" className="font-montserrat hover:bg-rich-gold/20">
                  Patreon Post Idea
                </SelectItem>
                <SelectItem value="affirmation" className="font-montserrat hover:bg-rich-gold/20">
                  Affirmation
                </SelectItem>
                <SelectItem value="journal_prompt" className="font-montserrat hover:bg-rich-gold/20">
                  Journal Prompt
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="modelProvider" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
              AI Model Provider
            </label>
            <Select value={modelProvider} onValueChange={(value) => setModelProvider(value as ModelProvider)}>
              <SelectTrigger className="w-full bg-midnight-blue border-warm-gray/50 text-magnolia-white font-montserrat">
                <SelectValue placeholder="Select AI provider" />
              </SelectTrigger>
              <SelectContent className="bg-midnight-blue-darker border-warm-gray text-magnolia-white">
                <SelectItem value="openai" className="font-montserrat hover:bg-rich-gold/20">
                  OpenAI (GPT-4o)
                </SelectItem>
                <SelectItem value="groq" className="font-montserrat hover:bg-rich-gold/20">
                  Groq (Llama3 8B)
                </SelectItem>
                <SelectItem value="perplexity" className="font-montserrat hover:bg-rich-gold/20">
                  Perplexity (Sonar Small)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label htmlFor="prompt" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Your Prompt
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Write a blog post intro about the importance of rest for chronic illness warriors, in a gentle and empowering tone..."
            className="min-h-[120px] bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
            rows={5}
          />
        </div>
        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-sage-green text-midnight-blue hover:bg-sage-green/90 font-montserrat text-base py-3 transition-all duration-300 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-rich-gold focus:ring-offset-2 focus:ring-offset-midnight-blue-darker"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-midnight-blue"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Wisdom...
            </span>
          ) : (
            "Generate Content"
          )}
        </Button>
        {generatedContent && (
          <div className="mt-6 p-6 bg-midnight-blue rounded-lg border border-rich-gold/30 shadow-inner">
            <h3 className="font-playfair text-xl text-rich-gold mb-3">Generated Content:</h3>
            <p className="font-lora whitespace-pre-wrap text-magnolia-white/90 leading-relaxed">{generatedContent}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
