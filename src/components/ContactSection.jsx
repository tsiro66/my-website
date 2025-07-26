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
      {/* Animated gradient orbs */}
      <div className="absolute top-10 md:top-20 right-10 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-40 md:w-80 h-40 md:h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left side - Contact Info */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
                Επικοινωνία
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8">
                Ας συζητήσουμε το επόμενό σας project
              </p>
              
              <div className="space-y-4 md:space-y-6 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-500 text-xs md:text-sm">Email</p>
                    <p className="text-white text-base md:text-lg">tsiro.thodoris@gmail.com</p>
                  </div>
                </div>
                
               
                
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-500 text-xs md:text-sm">Διαθεσιμότητα</p>
                    <p className="text-white text-base md:text-lg">Δευτέρα - Παρασκευή</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-800">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-gray-400 text-xs md:text-sm mb-2">
                    Όνομα
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm md:text-base"
                    placeholder="Το όνομά σας"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-xs md:text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm md:text-base"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-xs md:text-sm mb-2">
                    Μήνυμα
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows="4"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm md:text-base"
                    placeholder="Πείτε μας για το project σας..."
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
className="w-full flex items-center justify-center px-8 py-4 text-gray-50 font-medium rounded-sm transition
               duration-300 cursor-pointer bg-gradient-to-r from-blue-600  to-purple-700 hover:from-purple-700
                hover:to-blue-600 "                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Αποστολή...
                    </span>
                  ) : (
                    'Αποστολή Μηνύματος'
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-center">
                      ✓ Το μήνυμά σας στάλθηκε επιτυχώς!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 opacity-30">
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;