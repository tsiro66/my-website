import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Παρακαλώ συμπληρώστε όλα τα πεδία');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-screen bg-black flex items-center justify-center snap-start relative overflow-hidden py-16 md:py-0">
      {/* Subtle animated gradient orbs - responsive sizing */}
      <div className="absolute top-20 md:top-1/3 right-10 md:right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 md:bottom-1/3 left-10 md:left-1/4 w-32 md:w-64 h-32 md:h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left side - Contact Info */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6">
                Επικοινωνία
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 px-4 sm:px-0">
                Ας συζητήσουμε το επόμενό σου project
              </p>
              
              <div className="space-y-4 md:space-y-6 max-w-md mx-5 lg:mx-0 text-sm sm:text-base">
               
                
                <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-gray-400">Διαθεσιμότητα:</span>
                  <span className="text-white">Δευτέρα - Κυριακή</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Contact Form */}
            <div className="border border-white/10 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Όνομα
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/60 transition-colors text-sm sm:text-base"
                    placeholder="Το όνομά σου"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/60 transition-colors text-sm sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Μήνυμα
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/60 transition-colors resize-none text-sm sm:text-base"
                    placeholder="Πες μου για το project σου..."
                  />
                </div>
                
                <div className="drop-shadow-[0_0_40px_rgba(236,72,153,0.8)]">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 border border-pink-500 bg-pink-500 text-white md:text-black font-medium md:bg-transparent md:border-white md:text-white md:hover:bg-pink-500 md:hover:text-black md:hover:border-pink-500 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                  >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Αποστολή...
                    </span>
                  ) : (
                    'Αποστολή Μηνύματος'
                  )}
                </button>
                </div>
                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 sm:p-4 border border-green-500/30 rounded">
                    <p className="text-green-400 text-center text-sm sm:text-base">
                      ✓ Το μήνυμά σου στάλθηκε επιτυχώς!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;