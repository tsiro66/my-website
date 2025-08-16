import React from 'react';

const AboutSection = ({onContactClick}) => {
  const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'Gsap'];

  return (
    <section id="about" className="min-h-screen bg-black flex items-center justify-center snap-start relative overflow-hidden py-16 md:py-0">
      {/* Subtle animated gradient orbs - responsive sizing */}
      <div className="absolute top-20 md:top-1/3 left-10 md:left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 md:bottom-1/3 right-10 md:right-1/4 w-32 md:w-64 h-32 md:h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                Σχετικά
              </h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 px-4 sm:px-0">
                Ονομάζομαι Θοδωρής Τσιρώνης. Είμαι μηχανικός Η/Υ και Πληροφορικής με πάθος για τη δημιουργία σύγχρονων, γρήγορων και λειτουργικών ιστοσελίδων.
              </p>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 px-4 sm:px-0">
                Έχοντας σφαιρικές γνώσεις στον τομέα της Πληροφορικής,
                μπορώ να σου λύσω κάθε τεχνολογικό πρόβλημα.
              </p>

              {/* Minimal CTA */}
              <button
                onClick={onContactClick}
                className="inline-flex items-center text-white hover:text-purple-400 transition-colors group text-sm sm:text-base"
              >
                <span className="mr-2">Ας συνεργαστούμε</span>
                <svg className="w-4 sm:w-5 h-4 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Right side - Skills grid */}
            <div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-center rounded-full border border-purple-500 bg-purple-500 text-white md:bg-transparent md:border-gray-500 md:text-gray-300 font-medium md:hover:bg-purple-500 md:hover:text-white md:hover:border-purple-500 transition-all duration-300 text-xs sm:text-sm md:text-base"
                  >
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 mt-6 md:mt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">50+</div>
                  <div className="text-xs text-gray-500">Projects</div>
                </div>

                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">3+</div>
                  <div className="text-xs text-gray-500">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;