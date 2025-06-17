"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { PaintBrushIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function VintageArtModule() {
  const [artworkTitle, setArtworkTitle] = useState("")
  const [artworkStyle, setArtworkStyle] = useState("")
  const [descriptionPrompt, setDescriptionPrompt] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateDescription = async () => {
    setIsLoading(true)
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setGeneratedDescription(
      `This vintage artwork, titled "${artworkTitle}", is a stunning example of ${artworkStyle} style. It evokes [details from prompt] and would be a captivating addition to any collection. Its historical significance and aesthetic appeal make it a unique piece, resonating with themes of [themes].`,
    )
    setIsLoading(false)
  }

  return (
    <Card className="bg-midnight-blue-darker border-warm-gray text-magnolia-white shadow-gentle">
      <CardHeader>
        <div className="flex items-center gap-3">
          <PaintBrushIcon className="w-8 h-8 text-rich-gold" />
          <CardTitle className="font-playfair text-2xl text-rich-gold">Vintage Artwork Studio</CardTitle>
        </div>
        <CardDescription className="font-lora text-warm-gray">
          Generate evocative descriptions and contextual information for vintage art pieces.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="artworkTitle" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Artwork Title/Subject
          </label>
          <Input
            id="artworkTitle"
            value={artworkTitle}
            onChange={(e) => setArtworkTitle(e.target.value)}
            placeholder="e.g., Portrait of a Lady, 1890s"
            className="bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
          />
        </div>
        <div>
          <label htmlFor="artworkStyle" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Artistic Style/Period
          </label>
          <Input
            id="artworkStyle"
            value={artworkStyle}
            onChange={(e) => setArtworkStyle(e.target.value)}
            placeholder="e.g., Art Nouveau, Victorian Era"
            className="bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
          />
        </div>
        <div>
          <label htmlFor="descriptionPrompt" className="block font-montserrat text-sm font-medium text-sage-green mb-1">
            Key Features/Impressions for Description
          </label>
          <Textarea
            id="descriptionPrompt"
            value={descriptionPrompt}
            onChange={(e) => setDescriptionPrompt(e.target.value)}
            placeholder="e.g., Muted color palette, melancholic expression, intricate lace details..."
            className="min-h-[100px] bg-midnight-blue border-warm-gray/50 text-magnolia-white font-lora focus:border-rich-gold"
          />
        </div>
        <Button
          onClick={handleGenerateDescription}
          disabled={isLoading || !descriptionPrompt.trim()}
          className="w-full bg-sage-green text-midnight-blue hover:bg-sage-green/90 font-montserrat text-base py-3"
        >
          {isLoading ? "Interpreting Art..." : "Generate Art Description"}
        </Button>
        {generatedDescription && (
          <div className="mt-6 p-4 bg-midnight-blue rounded-lg border border-rich-gold/30">
            <h3 className="font-playfair text-lg text-rich-gold mb-2">Generated Artwork Description:</h3>
            <p className="font-lora whitespace-pre-wrap">{generatedDescription}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
