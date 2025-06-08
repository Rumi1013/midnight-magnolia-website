import React, { useCallback, useEffect, useRef } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import '../styles/design-system.css';

// Carousel Navigation Buttons
interface CarouselButtonProps {
  className?: string;
  onClick: () => void;
  disabled: boolean;
  children?: React.ReactNode;
}

const PrevButton: React.FC<CarouselButtonProps> = ({ className, onClick, disabled, children }) => (
  <button
    className={`carousel-btn carousel-btn-prev ${className || ''} ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children || '🌙'}
  </button>
);

const NextButton: React.FC<CarouselButtonProps> = ({ className, onClick, disabled, children }) => (
  <button
    className={`carousel-btn carousel-btn-next ${className || ''} ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children || '🌸'}
  </button>
);

// Custom hook for carousel buttons
const useCarouselButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

// Main Carousel Component
type SacredCarouselProps = {
  className?: string;
  slides: React.ReactNode[];
  options?: EmblaCarouselType["options"];
  autoplay?: boolean;
  autoplayDelay?: number;
  maxTranslateY?: number;
  tweenFactorBase?: number;
};

const TWEEN_FACTOR_BASE = 0.3;
const MAX_TRANSLATE_Y = 80;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const SacredCarousel: React.FC<SacredCarouselProps> = (props) => {
  const {
    slides,
    options,
    className,
    autoplay = true,
    autoplayDelay = 4000,
    maxTranslateY = MAX_TRANSLATE_Y,
    tweenFactorBase = TWEEN_FACTOR_BASE,
  } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplay
      ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
      : [],
  );
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useCarouselButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = tweenFactorBase * emblaApi.scrollSnapList().length;
  }, [tweenFactorBase]);

  const tweenTranslate = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi
        .scrollSnapList()
        .forEach((scrollSnap: number, snapIndex: number) => {
          let diffToTarget = scrollSnap - scrollProgress;
          const slidesInSnap = engine.slideRegistry[snapIndex];

          slidesInSnap.forEach((slideIndex: number) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

            if (engine.options.loop) {
              engine.slideLooper.loopPoints.forEach((loopItem: any) => {
                const target = loopItem.target();

                if (slideIndex === loopItem.index && target !== 0) {
                  const sign = Math.sign(target);

                  if (sign === -1) {
                    diffToTarget = scrollSnap - (1 + scrollProgress);
                  }
                  if (sign === 1) {
                    diffToTarget = scrollSnap + (1 - scrollProgress);
                  }
                }
              });
            }

            const tweenValue = Math.abs(diffToTarget * tweenFactor.current);
            const translateY = numberWithinRange(
              tweenValue * maxTranslateY,
              0,
              maxTranslateY,
            );

            const opacity = numberWithinRange(1 - tweenValue * 0.3, 0.7, 1);

            const tweenNode = tweenNodes.current[slideIndex];
            if (tweenNode) {
              tweenNode.style.transform = `translateY(${translateY}px)`;
              tweenNode.style.opacity = opacity.toString();
            }
          });
        });
    },
    [maxTranslateY],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenTranslate(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenTranslate)
      .on("scroll", tweenTranslate);
  }, [emblaApi, setTweenFactor, setTweenNodes, tweenTranslate]);

  return (
    <div className="sacred-carousel-container">
      <div className="sacred-carousel-viewport" ref={emblaRef}>
        <div className="sacred-carousel-container-inner">
          {slides.map((slide, index) => (
            <div
              className="sacred-carousel-slide"
              key={index}
            >
              <div
                className={`embla__slide__number sacred-slide-content ${
                  className || ""
                }`}
              >
                <div className="sacred-slide-inner">
                  <div className="sacred-slide-wrapper">
                    {slide}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sacred-carousel-controls">
        <PrevButton
          className="sacred-carousel-nav-btn"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          className="sacred-carousel-nav-btn"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
};

// Sacred Testimonials Data
const SacredTestimonialsData = [
  {
    id: 1,
    text: "Midnight Magnolia helped me transform my trauma into a thriving digital business. The healing-centered approach and gentle guidance created space for both processing and prosperity.",
    name: "Maya Johnson",
    role: "Creative Entrepreneur & Survivor",
    location: "Atlanta, GA",
    image: "/images/professional/healing-journey-1.jpg",
    membership: "Magnolia Bloom",
    element: "🌸"
  },
  {
    id: 2,
    text: "The Sacred Memberships community became my digital sanctuary. Here, I found Black women who understood both the weight of generational trauma and the power of technological liberation.",
    name: "Dr. Amelia Washington",
    role: "Therapist & Digital Healer",
    location: "New Orleans, LA",
    image: "/images/professional/healing-journey-2.jpg",
    membership: "Sacred Grove",
    element: "🌿"
  },
  {
    id: 3,
    text: "Through Midnight Magnolia's gentle justice approach, I learned to code not just systems, but pathways to healing. Technology became my tool for transforming communities.",
    name: "Zara Brooks",
    role: "Software Developer & Advocate",
    location: "Charleston, SC",
    image: "/images/professional/healing-journey-3.jpg",
    membership: "House of Midnight",
    element: "⚖️"
  },
  {
    id: 4,
    text: "The trauma-informed AI tools helped me process years of pain while building sustainable income streams. This isn't just a business model—it's a healing methodology.",
    name: "Keisha Davis",
    role: "AI Ethics Researcher",
    location: "Memphis, TN",
    image: "/images/professional/healing-journey-4.jpg",
    membership: "Digital Sanctuary",
    element: "🤖"
  },
  {
    id: 5,
    text: "Latisha's approach honors our ancestors while embracing digital innovation. I found my voice, my purpose, and my financial freedom all in one sacred space.",
    name: "Nia Thompson",
    role: "Content Creator & Healer",
    location: "Birmingham, AL",
    image: "/images/professional/healing-journey-5.jpg",
    membership: "Magnolia Bloom",
    element: "✨"
  },
];

// Main Component
export const SacredTestimonials: React.FC = () => {
  const OPTIONS: EmblaOptionsType = { 
    loop: true,
    align: 'center',
    skipSnaps: false 
  };
  
  const slides = SacredTestimonialsData.map((testimonial) => (
    <div
      key={testimonial.id}
      className="sacred-testimonial-card"
    >
      <div className="testimonial-background">
        <div className="testimonial-atmospheric-glow"></div>
        <div className="testimonial-fireflies">
          <div className="firefly firefly-1"></div>
          <div className="firefly firefly-2"></div>
        </div>
      </div>

      <div className="testimonial-content">
        <div className="testimonial-element">{testimonial.element}</div>
        
        <blockquote className="testimonial-quote">
          "{testimonial.text}"
        </blockquote>

        <div className="testimonial-author">
          <div className="author-info">
            <h4 className="author-name">{testimonial.name}</h4>
            <p className="author-role">{testimonial.role}</p>
            <p className="author-location">{testimonial.location}</p>
          </div>
          
          <div className="membership-badge">
            <span className="membership-tier">{testimonial.membership}</span>
          </div>
        </div>

        <div className="testimonial-decorative-border">
          <div className="border-element left"></div>
          <div className="border-element center">🌙</div>
          <div className="border-element right"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="sacred-testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">
          Sacred Stories of Transformation
        </h2>
        <p className="testimonials-subtitle">
          Hear from the beautiful souls who have found healing, purpose, and prosperity 
          within our Southern Gothic Digital Sanctuary
        </p>
      </div>

      <div className="testimonials-carousel-wrapper">
        <SacredCarousel
          slides={slides}
          options={OPTIONS}
          maxTranslateY={120}
          tweenFactorBase={0.25}
          className="sacred-testimonial-slide"
          autoplayDelay={5000}
        />
        
        {/* Atmospheric fade edges */}
        <div className="carousel-fade-left"></div>
        <div className="carousel-fade-right"></div>
      </div>
    </section>
  );
};

export default SacredTestimonials; 