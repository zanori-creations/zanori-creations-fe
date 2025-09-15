import React from 'react';

const ZanoriLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Crown and Emblem */}
      <div className="relative mb-6">
        {/* Crown */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-3 bg-black relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-black"></div>
            <div className="absolute -top-1 left-0 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-black"></div>
            <div className="absolute -top-1 right-0 w-0 h-0 border-l-[3px] border-r-[3px] border-b-[6px] border-l-transparent border-r-transparent border-b-black"></div>
          </div>
        </div>
        
        {/* Main Emblem */}
        <div className="relative w-16 h-20">
          {/* Outer curved shape */}
          <div className="absolute inset-0">
            <svg width="64" height="80" viewBox="0 0 64 80" className="w-full h-full">
              <path
                d="M32 2C45 8 58 20 58 40C58 50 52 58 45 62C38 66 32 68 32 68C32 68 26 66 19 62C12 58 6 50 6 40C6 20 19 8 32 2Z"
                fill="black"
              />
              {/* Inner curved shape */}
              <path
                d="M32 8C40 12 48 20 48 36C48 44 44 50 38 53C32 56 32 56 32 56C32 56 32 56 26 53C20 50 16 44 16 36C16 20 24 12 32 8Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Brand Name */}
      <h1 className="text-4xl font-serif font-bold text-black tracking-wider">
        ZANORI
      </h1>
    </div>
  );
};

export default ZanoriLogo;
