import gsap from "gsap";
import { useEffect, useRef } from "react";

const HeroSection = ({ className, isMobile, onContactClick }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;
      gsap.fromTo(
        Array.from(textRef.current.children),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          delay: 0.25,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen bg-black flex items-center overflow-hidden snap-mandatory snap-start ${
        className || ""
      }`}
    >
    
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 xl:px-50 flex flex-col lg:flex-row items-center justify-between relative z-20">
        <div
          ref={textRef}
          className={`w-full lg:w-1/2 z-10 mb-12 lg:mb-0 flex flex-col items-center text-center lg:items-start lg:text-left ${
            isMobile ? 'mt-[30vh]' : ''
          }`}
        >
          <div>
            <h1 className="text-6xl lg:text-8xl font-bold text-white tracking-tight">
              Θοδωρής<br />
              Τσιρώνης
            </h1>
          </div>

          <div className="mt-6 md:pl-2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-400 mb-6 font-light">
              Web Developer
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-md">
              Δημιουργώ σύγχρονες, καινοτόμες και ταχύτατες ιστοσελίδες
            </p>

            {/* Simple CTA Button - matching footer style */}
            <button
              onClick={onContactClick}
              className="px-8 py-4 border border-white/20  text-white font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              Επικοινώνησε μαζί μου
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-96 hidden lg:block">
          {/* Desktop shapes (NavigationShapes) will render */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;