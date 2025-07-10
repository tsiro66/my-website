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
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          delay: 0.3,
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
      className="relative min-h-screen bg-black flex items-center overflow-hidden snap-start"
    >
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 xl:px-50 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side - Text content */}
        <div
          ref={textRef}
          className="w-full lg:w-1/2 z-10 mb-12 lg:mb-0 pt-8 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Name + shapes row for mobile only */}
          <div className="flex items-center justify-start space-x-4 lg:space-x-0">
            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
                Θοδωρής<br />Τσιρώνης
              </h1>
            </div>

            {/* Static spheres on mobile only */}
            <div className="relative w-28 h-28 mt-2 flex-shrink-0 lg:hidden">
              <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 top-6 left-3 z-10" />
              <div className="absolute w-15 h-15 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 top-1 left-11 z-0" />
              <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 top-12 left-18 z-20" />
            </div>
          </div>

          {/* Subtitle, paragraph, button */}
          {/* Subtitle, paragraph, button */}
<div className="mt-6 flex flex-col items-center text-center lg:items-start lg:text-left">
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-4 font-light">
    Web Developer
  </h2>

  <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-md">
    Δημιουργώ σύγχρονες, minimal και καινοτόμες διαδικτυακές εμπειρίες
  </p>

  <button
    className="flex items-center justify-center px-8 py-4 text-white font-medium rounded-full transition
     duration-300 hover:!scale-105 cursor-pointer bg-gradient-to-tr from-purple-600  to-purple-800 hover:from-purple-800
      hover:to-purple-600"
    onClick={() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }}
  >
    Επικοινώνησε μαζί μου
  </button>
</div>

        </div>

        {/* Right side - Desktop shapes, hidden on mobile */}
        <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-96 hidden lg:block">
          {/* Shapes are rendered by NavigationShapes component on desktop only */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
