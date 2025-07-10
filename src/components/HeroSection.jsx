import gsap from "gsap";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.2, delay: 0.3, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section  id="hero"
      ref={containerRef}
      className="relative min-h-screen bg-black flex items-center overflow-hidden snap-start"
    >
      <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-50 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side - Text content */}
        <div ref={textRef} className="w-full lg:w-1/2 z-10 mb-12 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Θοδωρής<br />Τσιρώνης
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-4 font-light">
            Web Developer
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-md">
            Δημιουργώ σύγχρονες, minimal και καινοτόμες διαδικτυακές εμπειρίες
          </p>

          <button className="flex items-center justify-center px-8 py-4 text-white font-medium rounded-full transition
           duration-300 hover:!scale-105 cursor-pointer bg-gradient-to-tr from-purple-600  to-purple-800 hover:from-purple-800
            hover:to-purple-600"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Επικοινώνησε μαζί μου
          </button>
        </div>

        {/* Right side - Empty space for shapes */}
        <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-96">
          {/* Shapes are rendered by NavigationShapes component */}
        </div>
      </div>
           
    </section>
  );
};

export default HeroSection;
