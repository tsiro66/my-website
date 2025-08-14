import { CgMenuRight } from "react-icons/cg";
import { useState } from "react";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 z-[999] flex items-center justify-between px-4 backdrop-blur-md bg-black/40 border-b border-white/10 text-white lg:hidden">
        {/* Left: Logo Spheres */}
        <div className="relative w-12 h-12">
          <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 top-2 left-0 z-10 shadow-lg shadow-pink-400/40 animate-pulse" />
          <div className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 top-0 left-4 z-0 shadow-lg shadow-purple-400/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 top-5 left-5 z-20 shadow-lg shadow-yellow-400/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        
        {/* Right: Hamburger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <CgMenuRight className="text-3xl" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[998] bg-black/95 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-white">
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-2xl hover:text-purple-400 transition-colors duration-200"
            >
              Αρχική
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-2xl hover:text-purple-400 transition-colors duration-200"
            >
              Σχετικά
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-2xl hover:text-purple-400 transition-colors duration-200"
            >
              Επικοινωνία
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;