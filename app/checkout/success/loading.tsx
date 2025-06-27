export default function Loading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
        <p className="font-lora text-magnolia-white/80">Preparing your sacred confirmation...</p>
      </div>
    </div>
  )
}
