import React, { useState, useEffect } from "react";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const menuItems = [
    { id: "hero", label: "Αρχική" },
    { id: "about", label: "Σχετικά" },
    { id: "contact", label: "Επικοινωνία" },
  ];

  return (
    <>
      {/* Fixed Header Bar */}
      <div className={`fixed top-0 left-0 h-16 w-full z-[999] lg:hidden transition-all duration-300 ${
        isMenuOpen 
          ? '' 
          : 'bg-gray-900/20 backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between h-full px-6">
          {/* Original Logo Spheres */}
          <div className="relative w-10 h-10">
            <div className="drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
              <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 top-2 left-0 z-10" />
            </div>
            <div className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              <div className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 top-0 left-4 z-0" />
            </div>
            <div className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
              <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 top-5 left-5 z-20" />
            </div>
          </div>
          
          {/* Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-10 h-10 flex flex-col items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
            }`} />
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`} />
            <span className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[998] lg:hidden transition-transform duration-500 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Background Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-70' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-[75%] max-w-sm bg-gray-900 shadow-2xl transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="px-6 py-3 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Μενού</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
               
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-6 py-8">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li 
                  key={item.id}
                  className={`transform transition-all duration-500 ${
                    isMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
            <div className="space-y-4">
              <div className="flex items-center justify-center drop-shadow-[0_0_40px_rgba(168,85,247)]">
              <button
                className="px-6 py-3 sm:py-4 border border-purple-500 bg-purple-500 text-white font-medium text-sm"
              >
                Πάρε με τηλέφωνο!
              </button>
            </div>
              
              {/* Social Links */}
              <div className="flex items-center justify-center space-x-6 pt-2">
                <a 
                  href="https://github.com/tsiro66" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/thodoris-tsironis-173b1b24a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:tsiro.thodoris@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
              
              {/* Contact Info */}
              <div className="text-center text-sm text-gray-400">
                <p>tsiro.thodoris@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;