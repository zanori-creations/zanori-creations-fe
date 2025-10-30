import HeroCarousel from '@/components/HeroCarousel';
import CategorySection from '@/components/CategorySection';
import FeaturedSection from '@/components/FeaturedSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Category Section */}
      <CategorySection />
      
      {/* Featured Section */}
      <FeaturedSection />
    </div>
  );
}