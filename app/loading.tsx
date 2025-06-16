export default function Loading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-sage-green/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-sage-green border-t-transparent animate-spin"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-magnolia-white font-playfair text-xl">Preparing your sanctuary...</h2>
          <p className="text-warm-gray font-lora text-sm">Gathering healing energies</p>
        </div>
      </div>
    </div>
  )
}
