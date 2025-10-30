'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          {/* Background Image */}
          <Image
            src="/assets/itemsimg/tolu-akinyemi-03AGqaKKf8E-unsplash.jpg"
            alt="December 2025 Show"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white text-sm tracking-[0.3em] mb-4 uppercase">
              EXCLUSIVE COLLECTION
            </p>
            <h2 className="text-white text-4xl md:text-6xl font-light tracking-wider mb-8">
              DECEMBER 2025 SHOW
            </h2>
            <Link
              href="/category/december-2025"
              className="bg-transparent text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors border border-white"
            >
              DISCOVER MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

