import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-magnolia-white/5 border-magnolia-white/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-sage-green/10 flex items-center justify-center">
            <Search className="h-6 w-6 text-sage-green" />
          </div>
          <CardTitle className="text-magnolia-white font-playfair">Path Not Found</CardTitle>
          <CardDescription className="text-warm-gray font-lora">
            This sacred path does not exist in our digital sanctuary. Let us guide you back to familiar ground.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-medium">
              <Home className="h-4 w-4 mr-2" />
              Return to sanctuary
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
