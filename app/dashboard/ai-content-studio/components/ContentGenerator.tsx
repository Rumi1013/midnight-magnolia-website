"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function ContentGenerator() {
  const [contentType, setContentType] = useState("blog_post")
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setGeneratedContent("")
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setGeneratedContent(
      `This is AI-generated content for a ${contentType.replace("_", " ")} based on the prompt: "${prompt}". It embodies Midnight Magnolia's gentle, poetic, and trauma-informed voice, perfect for your audience of Black women, spoonies, and spiritual entrepreneurs. Remember to review and refine this content to perfectly match your unique brand essence.`,
    )
    setIsLoading(false)
  }

  return (
    <Card className="bg-midnight-blue-darker border-warm-gray text-magnolia-white shadow-gentle">
      <CardHeader>
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-rich-gold" />
          <CardTitle className="font-playfair text-2xl text-rich-gold">Universal Content Generator</CardTitle>
        </div>
        <CardDescription className="font-lora text-warm-gray">
          Craft compelling text for various platforms. Enter your prompt, select the content type, and let the AI assist
          you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
            </SelectContent>
          </Select>
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
          />
        </div>
        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-sage-green text-midnight-blue hover:bg-sage-green/90 font-montserrat text-base py-3"
        >
          {isLoading ? "Generating Wisdom..." : "Generate Content"}
        </Button>
        {generatedContent && (
          <div className="mt-6 p-4 bg-midnight-blue rounded-lg border border-rich-gold/30">
            <h3 className="font-playfair text-lg text-rich-gold mb-2">Generated Content:</h3>
            <p className="font-lora whitespace-pre-wrap">{generatedContent}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
