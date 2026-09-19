import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('🎉 Subscribed successfully!');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative mt-8 md:mt-20 lg:mt-24 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
      
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        {/* Icon Badge */}
        <div className="mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-xl">📧</span>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Newsletter
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Never Miss a <span className="text-primary">Deal!</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base lg:text-lg text-gray-500/80 max-w-2xl mb-6 md:mb-8">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
          <span className="block text-primary/60 text-xs md:text-sm mt-1">
            ✨ Join 10,000+ happy subscribers
          </span>
        </p>

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 w-full max-w-2xl"
        >
          <div className="relative w-full sm:flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 sm:h-14 pl-12 pr-4 border-2 border-gray-200 
                rounded-xl sm:rounded-r-none sm:rounded-l-xl
                focus:border-primary focus:ring-2 focus:ring-primary/20 
                outline-none transition-all duration-300 text-gray-700 
                placeholder:text-gray-400 bg-white shadow-sm hover:shadow-md"
              placeholder="Enter your email address"
              required
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="relative w-full sm:w-auto px-8 md:px-12 h-12 sm:h-14 
              bg-gradient-to-r from-cyan to-cyan-500 
              hover:from-primary-dark hover:to-primary 
              text-white font-semibold rounded-xl sm:rounded-l-none sm:rounded-r-xl
              transition-all duration-300 transform hover:scale-[1.02] 
              hover:shadow-lg active:scale-95 disabled:opacity-70 
              disabled:cursor-not-allowed group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
              transition-transform duration-1000 bg-gradient-to-r from-transparent 
              via-white/20 to-transparent" />
          </button>
        </form>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No spam, unsubscribe anytime</span>
          </div>
          
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★★★★★</span>
            <span className="text-sm text-gray-500">4.9/5</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex -space-x-2">
            {['https://i.pravatar.cc/32?img=1', 'https://i.pravatar.cc/32?img=2', 
              'https://i.pravatar.cc/32?img=3', 'https://i.pravatar.cc/32?img=4'].map((url, i) => (
              <img key={i} src={url} alt="Subscriber" 
                className="w-8 h-8 rounded-full border-2 border-white shadow-md" />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">1,234+</span> subscribers joined this week
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;