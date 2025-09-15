import React from 'react';
import Image from 'next/image';

const ZanoriLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image with enhanced animations */}
      <div className="mb-12 relative group animate-scale-in">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 animate-glow"></div>
        
        {/* Main logo container */}
        <div className="relative glass rounded-full p-8 hover-lift transition-all duration-500 group-hover:scale-110">
          <Image
            src="/assets/logo.jpeg"
            alt="Zanori Logo"
            width={120}
            height={120}
            className="object-contain relative z-10 transition-transform duration-500 group-hover:rotate-3"
            priority
          />
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/50 transition-all duration-700 animate-spin-slow"></div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-white/40 rounded-full animate-bounce-slow"></div>
        <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 -right-4 w-1 h-1 bg-white/20 rounded-full animate-bounce-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Brand Name with staggered animation */}
      <h1 className="text-6xl md:text-7xl font-serif font-bold text-gradient tracking-wider mb-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
        ZANORI
      </h1>
      
      {/* Animated underline */}
      <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-fade-in" style={{animationDelay: '0.6s'}}></div>
      
      {/* Decorative elements */}
      <div className="flex space-x-2 mt-6 animate-fade-in" style={{animationDelay: '0.9s'}}>
        <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse-slow"></div>
        <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
        <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default ZanoriLogo;
