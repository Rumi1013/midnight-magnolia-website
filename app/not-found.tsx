import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-[#0A192F] border border-[#D4B99F]/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-[#FAF3E0] mb-4">Lost in the Garden</h2>
          <p className="text-[#D4B99F] mb-6">
            The path you seek cannot be found. Let us guide you back to the sanctuary.
          </p>
          <Link href="/">
            <Button className="bg-[#A3B18A] hover:bg-[#A3B18A]/90 text-[#0A192F]">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
