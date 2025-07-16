import Header from "./components/Header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-6xl font-bold text-magnolia-white mb-6">
              Welcome to Your Digital Sanctuary
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
              productivity and sacred rituals.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
