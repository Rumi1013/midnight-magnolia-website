import { Suspense } from "react"
import { CheckCircle, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

function SuccessContent() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-warm-gray/5 border-warm-gray/20">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-sage-green" />
          </div>
          <CardTitle className="text-2xl font-playfair text-magnolia-white mb-2">Sacred Purchase Complete</CardTitle>
          <p className="text-warm-gray">
            Your healing journey begins now. Thank you for trusting us with your sacred path.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-midnight-blue/50 rounded-lg p-6 border border-warm-gray/10">
            <h3 className="font-lora text-magnolia-white text-lg mb-3 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-gold" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-warm-gray">
              <li className="flex items-start">
                <span className="text-gold mr-2">•</span>
                Check your email for order confirmation and download links
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">•</span>
                Digital products are available immediately
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">•</span>
                Physical items will ship within 3-5 business days
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">•</span>
                Join our community for ongoing support and wisdom
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-sage-green hover:bg-sage-green/90 text-midnight-blue">
              <Link href="/resources">
                <Download className="w-4 h-4 mr-2" />
                Access Your Resources
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-warm-gray/30 text-magnolia-white hover:bg-warm-gray/10"
            >
              <Link href="/community">Join Our Sacred Community</Link>
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-warm-gray/70 text-sm mb-4">Need help? We're here to support your journey.</p>
            <Button asChild variant="ghost" className="text-gold hover:text-gold/80">
              <Link href="/contact">Contact Sacred Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
          <div className="text-magnolia-white">Loading your sacred confirmation...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
