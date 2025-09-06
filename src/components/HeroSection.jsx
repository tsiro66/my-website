import { useEffect, useRef } from "react";

const HeroSection = ({ className, isMobile, onContactClick }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation for mobile
    if (textRef.current) {
      const elements = Array.from(textRef.current.children);
      elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 150);
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen bg-black flex items-center overflow-hidden snap-mandatory snap-start ${
        className || ""
      }`}
    >
      {/* Gradient orbs - adjusted for mobile */}
      <div className="absolute top-20 md:bottom-1/3 right-10 md:hidden w-48 md:w-96 h-48 md:h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-60 md:bottom-1/3 left-10 md:hidden w-32 md:w-64 h-32 md:h-64 bg-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 xl:px-50 flex flex-col lg:flex-row items-center justify-between relative z-20">
        <div
          ref={textRef}
          className={`w-full lg:w-1/2 z-10 flex flex-col items-center text-center lg:items-start lg:text-left ${
            isMobile ? 'pt-20' : ''
          }`}
        >
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white">
              Θοδωρής<br />
              Τσιρώνης
            </h1>
          </div>

          <div className="mt-6 md:pl-2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400 mb-4 md:mb-6 font-light">
              Web Developer
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-sm md:max-w-md px-4 sm:px-0">
              Δημιουργώ σύγχρονες, καινοτόμες και ταχύτατες ιστοσελίδες
            </p>

            {/* CTA Button - purple bg for mobile, hover effect for desktop */}
            <div className="drop-shadow-[0_0_40px_rgba(168,85,247)]">
              <button
                onClick={onContactClick}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 bg-purple-500
                 text-white font-medium lg:bg-transparent lg:border-white lg:hover:bg-purple-500
                  md:hover:border-purple-500 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                Επικοινώνησε μαζί μου
              </button>
            </div>
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