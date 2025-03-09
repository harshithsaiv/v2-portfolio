import React, { useState, useRef, lazy, Suspense } from 'react';
// Lazy load reCAPTCHA
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

const Contact = () => {
  // Form state - use a single state object to reduce re-renders
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  // Use a ref for captcha value to avoid unnecessary re-renders
  const captchaValueRef = useRef(null);
  const recaptchaRef = useRef(null);
  
  // Only show captcha when user starts interacting with the form
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Handle input changes - optimized to use a callback function
  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Show captcha after user starts typing
    if (!showCaptcha) {
      setShowCaptcha(true);
    }
  }, [showCaptcha]);

  // Handle captcha change - use ref instead of state
  const handleCaptchaChange = React.useCallback((value) => {
    captchaValueRef.current = value;
  }, []);

  // Handle form submission - optimized
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "All fields are required"
      });
      return;
    }
    
    // Validate captcha
    if (!captchaValueRef.current) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Please complete the captcha"
      });
      return;
    }
    
    // Submit form
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Send the form data to your API Gateway endpoint
      const response = await fetch('https://your-api-gateway-url.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          captchaValue: captchaValueRef.current
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      captchaValueRef.current = null;
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: error.message || "Failed to send message. Please try again."
      });
    }
  }, [formData]);

  // Memoize contact form elements to prevent unnecessary re-renders
  // const contactForm = React.useMemo(() => (
  //   <form onSubmit={handleSubmit} className="space-y-4">
  //     <div>
  //       <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
  //         Name
  //       </label>
  //       <input
  //         type="text"
  //         id="name"
  //         name="name"
  //         value={formData.name}
  //         onChange={handleInputChange}
  //         className="w-full bg-background-tertiary border border-border rounded-md px-4 py-2 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-secondary"
  //         placeholder="Your name"
  //       />
  //     </div>
      
  //     <div>
  //       <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
  //         Email
  //       </label>
  //       <input
  //         type="email"
  //         id="email"
  //         name="email"
  //         value={formData.email}
  //         onChange={handleInputChange}
  //         className="w-full bg-background-tertiary border border-border rounded-md px-4 py-2 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-secondary"
  //         placeholder="your.email@example.com"
  //       />
  //     </div>
      
  //     <div>
  //       <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
  //         Message
  //       </label>
  //       <textarea
  //         id="message"
  //         name="message"
  //         value={formData.message}
  //         onChange={handleInputChange}
  //         rows={5}
  //         className="w-full bg-background-tertiary border border-border rounded-md px-4 py-2 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-secondary"
  //         placeholder="What would you like to say?"
  //       />
  //     </div>
      
  //     {showCaptcha && (
  //       <div className="pt-2">
  //         <Suspense fallback={<div className="h-78 flex items-center justify-center">Loading captcha...</div>}>
  //           <ReCAPTCHA
  //             ref={recaptchaRef}
  //             sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your site key
  //             onChange={handleCaptchaChange}
  //             theme="dark"
  //           />
  //         </Suspense>
  //       </div>
  //     )}
      
  //     {formStatus.error && (
  //       <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300 text-sm">
  //         {formStatus.error}
  //       </div>
  //     )}
      
  //     <div>
  //       <button
  //         type="submit"
  //         disabled={formStatus.submitting}
  //         className={`w-full px-6 py-3 text-sm lg:text-base text-white bg-secondary hover:bg-secondary/80 rounded-md transition-all duration-300 flex items-center justify-center ${
  //           formStatus.submitting ? "opacity-70 cursor-not-allowed" : ""
  //         }`}
  //       >
  //         {formStatus.submitting ? (
  //           <>
  //             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //             </svg>
  //             Sending...
  //           </>
  //         ) : (
  //           "Send Message"
  //         )}
  //       </button>
  //     </div>
  //   </form>
  // ), [formData, formStatus, handleInputChange, handleSubmit, showCaptcha]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full animate-slide-up">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-8">Get In Touch</h1>
        <div className="space-y-6">
          <p className="text-sm lg:text-base text-text-secondary leading-relaxed">
            I'm currently looking for new opportunities, and my inbox is always open. 
            Whether you have a question, opportunity, or just want to say hi, I'll get back to you!
          </p>
          
          {/* Contact Form */}
          {/* <div className="bg-background-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-white mb-4">Send me a message</h2>
            
            {formStatus.submitted ? (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-md text-green-300">
                Your message has been sent! I'll get back to you soon.
              </div>
            ) : contactForm}
          </div> */}
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a 
                href="mailto:harshithsaiveeraiah@gmail.com"
                className="text-sm lg:text-base text-text-secondary hover:text-white transition-colors duration-300"
              >
                harshithsaiveeraiah@gmail.com
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <a 
                href="https://www.linkedin.com/in/harshith-sai-v/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lg:text-base text-text-secondary hover:text-white transition-colors duration-300"
              >
                linkedin.com/in/harshith-sai-v
              </a>
            </div>

            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              <a 
                href="https://github.com/harshithsaiv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lg:text-base text-text-secondary hover:text-white transition-colors duration-300"
              >
                github.com/harshithsaiv
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/Harshith_Resume_Software_Engineering-4.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm lg:text-base text-white bg-secondary/10 border border-secondary rounded-md hover:bg-secondary/20 transition-all duration-300"
              download
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(Contact);