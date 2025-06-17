"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SolidMoonIcon } from "@heroicons/react/24/solid" // Assuming SolidMoonIcon is appropriate
import { useState } from "react"

// Mock Tarot Data
const tarotCards = [
  {
    name: "The Fool",
    upright: "New beginnings, innocence, spontaneity.",
    reversed: "Recklessness, naivete, risk-taking.",
  },
  {
    name: "The Magician",
    upright: "Manifestation, willpower, resourcefulness.",
    reversed: "Manipulation, poor planning, untapped talents.",
  },
  {
    name: "The High Priestess",
    upright: "Intuition, subconscious, mystery.",
    reversed: "Secrets, hidden agendas, repressed feelings.",
  },
  // ... Add more cards
]

export default function TarotDashboard() {
  const [drawnCard, setDrawnCard] = useState<{ name: string; upright: string; reversed: string } | null>(null)
  const [interpretation, setInterpretation] = useState("")
  const [isUpright, setIsUpright] = useState(true)

  const handleDrawCard = () => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length)
    const card = tarotCards[randomIndex]
    const upright = Math.random() > 0.5
    setDrawnCard(card)
    setIsUpright(upright)
    setInterpretation(upright ? card.upright : card.reversed)
  }

  return (
    <Card className="bg-midnight-blue-darker border-warm-gray text-magnolia-white shadow-gentle">
      <CardHeader>
        <div className="flex items-center gap-3">
          <SolidMoonIcon className="w-8 h-8 text-rich-gold" />
          <CardTitle className="font-playfair text-2xl text-rich-gold">Tarot Wisdom Dashboard</CardTitle>
        </div>
        <CardDescription className="font-lora text-warm-gray">
          Seek guidance, interpret spreads, and generate mystical content for your Tarot practice.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          onClick={handleDrawCard}
          className="w-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90 font-montserrat text-base py-3"
        >
          Draw a Daily Card
        </Button>
        {drawnCard && (
          <div className="mt-6 p-6 bg-midnight-blue rounded-lg border border-rich-gold/30 text-center">
            <h3 className="font-playfair text-2xl text-magnolia-white mb-2">{drawnCard.name}</h3>
            <p className="font-montserrat text-sm text-sage-green mb-3">{isUpright ? "Upright" : "Reversed"}</p>
            <img
              src={`/tarot-card.png?width=150&height=250&query=tarot+card+${drawnCard.name.toLowerCase().replace(/\s+/g, "+")}`}
              alt={drawnCard.name}
              className="mx-auto mb-4 rounded-md shadow-lg border-2 border-rich-gold"
            />
            <p className="font-lora text-magnolia-white/90 text-lg leading-relaxed">{interpretation}</p>
          </div>
        )}
        {/* Placeholder for more features */}
        <div className="text-center mt-8">
          <p className="font-lora text-warm-gray">Spread interpretation tools and AI-generated readings coming soon.</p>
        </div>
      </CardContent>
    </Card>
  )
}
