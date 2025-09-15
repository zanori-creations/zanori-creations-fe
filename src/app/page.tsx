import ZanoriLogo from '@/components/ZanoriLogo';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden cosmic-bg">
      {/* Cosmic Background with Stars */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 cosmic-gradient"></div>
        <div className="absolute inset-0 stars"></div>
        <div className="absolute inset-0 stars2"></div>
        <div className="absolute inset-0 stars3"></div>
        
        {/* Central Celestial Body */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full celestial-body">
          <div className="absolute inset-0 rounded-full celestial-glow"></div>
        </div>
      </div>
      
      {/* Header */}
      <header className="relative z-20 flex justify-start items-center p-8">
        <div className="animate-fade-in">
          <ZanoriLogo className="scale-75" />
        </div>
      </header>
      
      {/* Left Sidebar - Contact Info */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="vertical-text text-white/60 font-light tracking-widest space-y-4">
          <div>+234 905 888 5555</div>
          <div>Hello@zanoriworld.com</div>
        </div>
      </div>
      
      
      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Site Under Reconstruction */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-gray-400 text-sm font-light tracking-widest uppercase">
            SITE UNDER RECONSTRUCTION
          </p>
        </div>
        
        {/* Coming Soon */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider mb-8">
            COMING SOON
          </h1>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8 animate-scale-in">
          <div className="relative">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full cosmic-progress-bar rounded-full"></div>
            </div>
            <div className="text-center mt-4">
              <span className="text-white text-sm font-light">62%</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-20 flex justify-center items-end p-8">
        <div className="text-white/60 text-sm font-light">
          © 2024 Zanori. All rights reserved.
        </div>
      </footer>
    </div>
  );
}