import React, { useState, useEffect } from 'react';

// EmailJS Configuration - Replace these with your actual values
const EMAILJS_SERVICE_ID = 'service_2t9r2vn';
const EMAILJS_TEMPLATE_ID = 'template_err2lqi';
const EMAILJS_PUBLIC_KEY = '_02YrQwJoVSDnFrrP';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [emailJSLoaded, setEmailJSLoaded] = useState(false);

  // Load EmailJS SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        setEmailJSLoaded(true);
        console.log('EmailJS loaded successfully');
      }
    };
    script.onerror = () => {
      console.error('Failed to load EmailJS');
      setEmailJSLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Validation rules
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Το όνομα είναι υποχρεωτικό';
        } else if (value.trim().length < 2) {
          error = 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες';
        } else if (value.length > 50) {
          error = 'Το όνομα δεν μπορεί να υπερβαίνει τους 50 χαρακτήρες';
        } else if (!/^[a-zA-Zα-ωΑ-Ω\s'-]+$/.test(value)) {
          error = 'Το όνομα περιέχει μη έγκυρους χαρακτήρες';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Το email είναι υποχρεωτικό';
        } else if (!validateEmail(value)) {
          error = 'Παρακαλώ εισάγετε ένα έγκυρο email';
        } else if (value.length > 100) {
          error = 'Το email δεν μπορεί να υπερβαίνει τους 100 χαρακτήρες';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Το μήνυμα είναι υποχρεωτικό';
        } else if (value.trim().length < 5) {
          error = 'Το μήνυμα πρέπει να έχει τουλάχιστον 5 χαρακτήρες';
        } else if (value.length > 1000) {
          error = 'Το μήνυμα δεν μπορεί να υπερβαίνει τους 1000 χαρακτήρες';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Validate on change if field has been touched
    if (touched[field]) {
      setErrors({
        ...errors,
        [field]: validateField(field, value)
      });
    }
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    setErrors({
      ...errors,
      [field]: validateField(field, formData[field])
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      message: true
    });
    
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const sendEmail = async () => {
    // Check if EmailJS is loaded
    if (!emailJSLoaded || !window.emailjs) {
      throw new Error('EmailJS is not loaded');
    }

    // Prepare template parameters
    // These should match your EmailJS template variables
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Θοδωρής', // Your name
      reply_to: formData.email,
      // Add any other template variables you've set up in EmailJS
    };

    // Send email using EmailJS
    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return response;
  };

  const handleSubmit = async () => {
    // Clear any previous submit status
    setSubmitStatus(null);
    
    // Validate all fields
    if (!validateForm()) {
      setSubmitStatus('validation-error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    // Check if we're in development mode (no EmailJS credentials)
    const isDevelopment = EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID';
    
    setIsSubmitting(true);
    
    try {
      if (isDevelopment) {
        // Simulate sending in development mode
        console.log('Development mode - Form data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Email would be sent with:', formData);
      } else {
        // Send actual email
        const response = await sendEmail();
        console.log('Email sent successfully:', response);
      }
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      // Error handling
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
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
              <h2 className="play text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6">
                Επικοινωνία
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-4 md:mb-6 px-4 sm:px-0">
                Στείλε μου ένα μήνυμα για να συζητήσουμε το επόμενό σου project.
              </p>
              
              <div className="max-w-md mx-5 lg:mx-0 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row items-center">
                  <span className="text-base sm:text-lg md:text-xl text-gray-400">Απάντηση εντός 24 ωρών.</span>
                </div>
              </div>
              
              {/* Helpful tips */}
              <div className="mt-8 space-y-3 text-gray-500 text-sm hidden lg:block">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Χρήση Ctrl+Enter για γρήγορη αποστολή
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Τα δεδομένα σου είναι ασφαλή
                </p>
              </div>
            </div>
            
            {/* Right side - Contact Form */}
            <div className="border border-white/10 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Όνομα <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    onKeyDown={handleKeyPress}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border rounded text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base ${
                      errors.name && touched.name 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/20 focus:border-pink-500/60'
                    }`}
                    placeholder="Το όνομά σου"
                    maxLength="50"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Email <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    onKeyDown={handleKeyPress}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border rounded text-white placeholder-gray-500 focus:outline-none transition-colors text-sm sm:text-base ${
                      errors.email && touched.email 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/20 focus:border-pink-500/60'
                    }`}
                    placeholder="you@example.com"
                    maxLength="100"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Μήνυμα <span className="text-pink-500">*</span>
                    <span className="text-gray-600 text-xs ml-2">({formData.message.length}/1000)</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    onKeyDown={handleKeyPress}
                    rows="4"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border rounded text-white placeholder-gray-500 focus:outline-none transition-colors resize-none text-sm sm:text-base ${
                      errors.message && touched.message 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-white/20 focus:border-pink-500/60'
                    }`}
                    placeholder="Πες μου για το project σου..."
                    maxLength="1000"
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>
                
                <div className="drop-shadow-[0_0_40px_rgba(236,72,153,0.8)]">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || (!emailJSLoaded && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID')}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 border-2 border-pink-500 bg-pink-500 text-white
                     font-medium md:bg-transparent md:border-white md:hover:bg-pink-500
                      md:hover:border-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                      text-sm sm:text-base cursor-pointer"
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
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 sm:p-4 border border-green-500/30 bg-green-500/10 rounded">
                    <p className="text-green-400 text-center text-sm sm:text-base flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Το μήνυμά σου στάλθηκε επιτυχώς!
                    </p>
                  </div>
                )}
                
                {submitStatus === 'validation-error' && (
                  <div className="mt-4 p-3 sm:p-4 border border-red-500/30 bg-red-500/10 rounded">
                    <p className="text-red-400 text-center text-sm sm:text-base flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Παρακαλώ διόρθωσε τα σφάλματα στη φόρμα
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 sm:p-4 border border-red-500/30 bg-red-500/10 rounded">
                    <p className="text-red-400 text-center text-sm sm:text-base flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Κάτι πήγε στραβά. Παρακαλώ δοκίμασε ξανά.
                    </p>
                  </div>
                )}
                
                {/* EmailJS Configuration Notice - Only show in development */}
                {EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' && (
                  <div className="mt-4 p-3 border border-yellow-500/30 bg-yellow-500/10 rounded">
                    <p className="text-yellow-400 text-xs">
                      ⚠️ Development Mode: Replace EmailJS credentials at the top of the file
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