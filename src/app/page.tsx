import ZanoriLogo from '@/components/ZanoriLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Main Content */}
      <main className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <ZanoriLogo className="mb-16" />
        
        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-serif text-black mb-8 tracking-wide">
          Elegance That Speaks Quietly
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-2xl">
          A global fashion house built on timeless design, discipline, and detail. 
          From apparel to accessories and beyond, Zanori creates pieces that embody 
          quiet wealth, confidence, and enduring style.
        </p>
        
        {/* Site in Progress Notice */}
        <div className="bg-black text-white px-8 py-6 mb-16 max-w-md">
          <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
          <p className="text-sm opacity-90">
            We are crafting something extraordinary. 
            Our digital experience will be unveiled soon.
          </p>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-4 text-center">
          <div className="text-lg">
            <span className="text-gray-600">Phone:</span>
            <a 
              href="tel:+2349058885555" 
              className="text-black hover:underline ml-2 font-medium"
            >
              +234 905 888 5555
            </a>
          </div>
          <div className="text-lg">
            <span className="text-gray-600">Email:</span>
            <a 
              href="mailto:Hello@zanoriworld.com" 
              className="text-black hover:underline ml-2 font-medium"
            >
              Hello@zanoriworld.com
            </a>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-gray-200 w-full max-w-4xl">
        <p className="text-center text-gray-500 text-sm">
          © 2024 Zanori. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
