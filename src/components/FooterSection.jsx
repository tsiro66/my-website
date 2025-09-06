const FooterSection = ({ onContactClick }) => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center snap-start relative overflow-hidden">
      {/* Subtle animated gradient orbs - responsive sizing */}
      <div className="absolute top-20 md:top-1/5 left-10 md:left-1/6 transform -translate-x-1/6 -translate-y-1/6 w-48 md:w-96 h-48 md:h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-2/3 right-10 md:right-1/5 w-32 md:w-64 h-32 md:h-64 bg-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 px-2 sm:px-0">
              Έτοιμος να ξεκινήσουμε;
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-10 px-4 sm:px-0">
              Ας μετατρέψουμε την ιδέα σου σε πραγματικότητα
            </p>
            
            {/* CTA Button with golden glow - yellow bg on mobile */}
            <div className="inline-block drop-shadow-[0_0_40px_rgba(250,204,21,0.6)]">
              <button
                onClick={onContactClick}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-500/20 bg-yellow-500/90 text-white md:bg-transparent
                 md:border-white md:text-white md:hover:bg-yellow-500/90 md:hover:border-yellow-500/20 transition-all 
                 duration-300 font-medium text-sm sm:text-base cursor-pointer"
              >
                Επικοινώνησε μαζί μου
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-gray-400 sm:mb-16 md:mb-0 text-sm sm:text-base">
            <a href="https://github.com/tsiro66" target="_blank" rel="noopener noreferrer" 
               className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/thodoris-tsironis-173b1b24a/" target="_blank" rel="noopener noreferrer" 
               className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a href="mailto:tsiro.thodoris@gmail.com" 
               className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              tsiro.thodoris@gmail.com
            </a>
            <a href="tel:+306987828639" 
               className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +30 698 782 8639
            </a>
          </div>
        </div>
      </div>

      {/* Minimal copyright */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center text-gray-400 text-xs sm:text-sm px-4">
        © {new Date().getFullYear()} Θοδωρής Τσιρώνης | All rights reserved
      </div>
    </section>
  );
};

export default FooterSection;