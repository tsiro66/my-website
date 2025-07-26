import React from 'react';

const AboutSection = () => {
  const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'MongoDB'];

  return (
    <section id="about" className="min-h-screen bg-black flex items-center justify-center snap-start relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Σχετικά
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                Full-stack developer με πάθος για minimal design και καθαρό κώδικα. 
                Δημιουργώ modern web applications που συνδυάζουν αισθητική και λειτουργικότητα.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                5+ χρόνια εμπειρίας σε cutting-edge technologies και agile development.
              </p>
              
              {/* Minimal CTA */}
              <a 
                href="#contact"
                className="inline-flex items-center text-white hover:text-purple-400 transition-colors group"
              >
                <span className="mr-2">Ας συνεργαστούμε</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right side - Skills grid */}
            <div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-3 text-center hover:border-purple-500/50 transition-colors"
                  >
                    <span className="text-gray-300 text-sm md:text-base">{skill}</span>
                  </div>
                ))}
              </div>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                  <div className="text-xs text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">30+</div>
                  <div className="text-xs text-gray-500">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">5+</div>
                  <div className="text-xs text-gray-500">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal decoration */}
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;