import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="bg-midnight-blue text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-playfair mb-6">
              Cultivate Your Inner Garden
            </h1>
            <p className="text-lg font-montserrat mb-8">
              Discover tools and wisdom to nurture your mind, body, and spirit.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/blog"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Enter the Garden
              </Link>
              <Link
                href="/shop"
                className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Explore Sacred Collection
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative">
            <Image
              src="/hero-image.jpg" // Replace with your image path
              alt="Woman meditating in a garden"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
