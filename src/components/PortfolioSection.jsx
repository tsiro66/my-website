import { useState, useEffect } from 'react';

const PortfolioSection = ({ onContactClick }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Portfolio items with progress percentages
  const portfolioItems = [
    {
      id: 1,
      title: "Iστοσελίδα για σύμβουλο SEO",
      description: "Δημιουργία ενός σύγχρονου one-page portfolio για τον σύμβουλο SEO Μιχάλη Ζαργιανάκη.",
      technologies: ["React", "Tailwind"],
      progress: 100,
      link: "https://michaliszargianakis.netlify.app/",
      isExternal: true
    },
    {
      id: 2,
      title: "Ιστοσελίδα για καλλιτεχνικό ατελιέ",
      description: "Κατασκευή ιστοσελίδας για την προβολή των υπηρεσιών ενός καλλιτεχνικού ατελιέ.",
      technologies: ["React", "Tailwind", "React Router", "Framer Motion"],
      progress: 60,
      link: "https://atelieranadelta.netlify.app/",
      isExternal: true
    },
    {
      id: 3,
      title: "Ερχονται σύντομα...",
      description: "Επικοινωνήστε μαζί μου για να συζητήσουμε το επόμενο project σας!",
      technologies: ["React", "Tailwind", "React Router","Gsap"],
      progress: 0,
      link: null,
      isContact: true
    },
  ];

  // Animate cards on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      portfolioItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 100);
      });
    }, 100);
    return () => clearTimeout(timer);
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 80) return 'bg-yellow-500';
    return 'bg-purple-500';
  };

  const handleCardClick = (item) => {
    if (item.isContact && onContactClick) {
      onContactClick();
    }
  };

  // Determine if progress bar should be shown
  const shouldShowProgress = (itemId, index) => {
    // On mobile, always show after card is visible
    if (isMobile) {
      return visibleCards.includes(index);
    }
    // On desktop, show on hover
    return hoveredCard === itemId;
  };

  return (
    <section id="portfolio" className="min-h-screen bg-black flex items-center justify-center snap-start relative overflow-hidden py-16 md:py-0">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/6 w-48 md:w-96 h-48 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/6 w-32 md:w-64 h-32 md:h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="play text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Η δουλειά μου
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Μια επιλογή από τα πρόσφατα projects που έχω υλοποιήσει. Κάθε project είναι μοναδικό και κατασκευασμένο με προσοχή στη λεπτομέρεια.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative border border-white/10 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 transform ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Content */}
                <div className="p-6">
                  <h3 className="play text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs border border-gray-700 text-gray-400 rounded-full hover:border-purple-500 hover:text-purple-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className={`font-medium ${item.progress === 100 ? 'text-green-400' : 'text-white'}`}>
                        {item.progress}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`absolute inset-y-0 left-0 ${getProgressColor(item.progress)} transition-all duration-1000 ease-out rounded-full`}
                        style={{ 
                          width: shouldShowProgress(item.id, index) ? `${item.progress}%` : '0%',
                          transitionDelay: shouldShowProgress(item.id, index) ? '100ms' : '0ms'
                        }}
                      >
                        {/* Animated glow effect */}
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* View project link */}
                  <div className="mt-4 flex items-center justify-between">
                    {item.isContact ? (
                      <button
                        onClick={() => handleCardClick(item)}
                        className="text-sm text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group/link cursor-pointer"
                      >
                        <span>Επικοινώνησε μαζί μου</span>
                        <svg 
                          className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    ) : (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}
                        className="text-sm text-gray-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group/link"
                      >
                        <span>Δες το project</span>
                        <svg 
                          className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                    
                    {/* Live indicator for completed projects */}
                    {item.progress === 100 && (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Θέλεις να δεις περισσότερα; Εδώ θα βρεις όλα μου τα projects
            </p>
            <button className="text-white hover:text-purple-400 transition-colors inline-flex items-center gap-2 group">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/tsiro66?tab=repositories"
                className="text-white hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
              >
                <span>Δες όλα τα projects</span>
                <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;