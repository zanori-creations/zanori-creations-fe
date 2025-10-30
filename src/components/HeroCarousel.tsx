'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta1?: string;
  cta2?: string;
  link1?: string;
  link2?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/assets/itemsimg/ChatGPT Image Oct 27, 2025, 10_53_58 PM.png',
    title: '',
    subtitle: '',
  },
  {
    id: 2,
    image: '/assets/itemsimg/tolu-akinyemi--xlJZ1kNP54-unsplash.jpg',
    title: "MEN'S NEW ARRIVALS",
    subtitle: "MEN'S EXCLUSIVE COLLECTION",
  },
  {
    id: 3,
    image: '/assets/itemsimg/tolu-akinyemi-03AGqaKKf8E-unsplash.jpg',
    title: 'CONTEMPORARY FASHION',
    subtitle: 'MODERN ELEGANCE',
  },
  {
    id: 4,
    image: '/assets/itemsimg/delight-dzansi-_DmkY-1JqKY-unsplash.jpg',
    title: 'SIGNATURE STYLES',
    subtitle: 'TIMELESS PIECES',
  },
  {
    id: 5,
    image: '/assets/itemsimg/shedrack-salami-Ba1eGcAFj5w-unsplash.jpg',
    title: 'DECEMBER 2025 STYLES',
    subtitle: 'EXCLUSIVE COLLECTION',
  },
  {
    id: 6,
    image: '/assets/itemsimg/prince-akachi-s6tVlDVKz38-unsplash.jpg',
    title: "MEN'S LUXURY WEAR",
    subtitle: 'CRAFTED EXCELLENCE',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white text-sm tracking-[0.3em] mb-4 uppercase">
              {slide.subtitle}
            </p>
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-8 max-w-4xl">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}

    </div>
  );
};

export default HeroCarousel;

