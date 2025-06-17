"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { BookOpenIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function KdpAssistant() {
  const [bookTitle, setBookTitle] = useState("")
  const [keywords, setKeywords] = useState("")
  const [descriptionPrompt, setDescriptionPrompt] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateDescription = async () => {
    setIsLoading(true)
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setGeneratedDescription(
      `**${bookTitle}** - A captivating journey into [theme]. This book, infused with Midnight Magnolia's signature Southern Gothic grace, explores [key elements from prompt]. Perfect for readers seeking [target audience/genre]. Keywords: ${keywords}.`,
    )
    setIsLoading(false)
  }

  return (
    <Card className="bg-midnight-blue-darker border-warm-gray text-magnolia-white shadow-gentle">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BookOpenIcon className="w-8 h-8 text-rich-gold" />
          <CardTitle className="font-playfair text-2xl text-rich-gold">KDP Publishing Assistant</CardTitle>
        </div>
        <CardDescription className="font-lora text-warm-gray">
          Generate compelling titles, descriptions, and keywords for your Kindle Direct Publishing projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="bookTitle" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Book Title (Working Title)
          </label>
          <Input
            id="bookTitle"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="e.g., Whispers of the Bayou"
            className="bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Keywords (comma-separated)
          </label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., southern gothic, mystery, historical fiction, strong female lead"
            className="bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
          />
        </div>
        <div>
          <label htmlFor="descriptionPrompt" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Book Description Prompt
          </label>
          <Textarea
            id="descriptionPrompt"
            value={descriptionPrompt}
            onChange={(e) => setDescriptionPrompt(e.target.value)}
            placeholder="e.g., A young woman uncovers ancestral secrets in a haunted Louisiana plantation..."
            className="min-h-[100px] bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
          />
        </div>
        <Button
          onClick={handleGenerateDescription}
          disabled={isLoading || !descriptionPrompt.trim()}
          className="w-full bg-sage-green text-midnight-blue hover:bg-sage-green/90 font-montserrat text-base py-3"
        >
          {isLoading ? "Crafting Story..." : "Generate Book Description"}
        </Button>
        {generatedDescription && (
          <div className="mt-6 p-4 bg-midnight-blue rounded-lg border border-rich-gold/30">
            <h3 className="font-playfair text-lg text-rich-gold mb-2">Generated KDP Description:</h3>
            <p className="font-lora whitespace-pre-wrap">{generatedDescription}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
