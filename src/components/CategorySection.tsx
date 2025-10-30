'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCard {
  id: string;
  title: string;
  image: string;
  link: string;
  subtitle?: string;
}

const categories: CategoryCard[] = [
  {
    id: '1',
    title: 'NEW JEWELLERY',
    subtitle: 'Zanori store 25',
    image: '/assets/itemsimg/Large-843996V5LO02945_A.avif',
    link: '/category/new-attires',
  },
  {
    id: '2',
    title: "WOMEN'S NEW SHOES",
    subtitle: 'Zanori store 25',
    image: '/assets/itemsimg/delight-dzansi-ztXLvxmoOIY-unsplash.jpg',
    link: '/category/women-wears',
  },
  {
    id: '3',
    title: "MEN'S NEW ARRIVALS",
    subtitle: 'Zanori store 25',
    image: '/assets/itemsimg/prince-akachi-s6tVlDVKz38-unsplash.jpg',
    link: '/category/men-new-arrival',
  },
  {
    id: '4',
    title: "MEN'S NEW BAGS",
    subtitle: 'Zanori store 25',
    image: '/assets/itemsimg/Large-811816V3OO02783_B.avif',
    link: '/category/men-wears',
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid of category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="relative group overflow-hidden aspect-[4/5] bg-gray-100"
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {category.subtitle && (
                  <p className="text-white text-xs tracking-[0.3em] mb-2 uppercase">
                    {category.subtitle}
                  </p>
                )}
                <h3 className="text-white text-2xl md:text-3xl font-light tracking-wider mb-6">
                  {category.title}
                </h3>
                <span className="bg-white text-black px-2 py-2 text-sm tracking-wider uppercase transition-colors group-hover:bg-black group-hover:text-white border border-white">
                  VIEW MORE
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

