'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getTotalItems());

  const navItems = [
    { name: 'New', href: '/category/new-attires' },
    { name: 'Women', href: '/category/women-wears' },
    { name: 'Men', href: '/category/men-wears' },
    { name: 'Bags', href: '/category/new-attires' },
    { name: 'December Styles', href: '/category/december-2025' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200 px-4 lg:px-10">
      <div className="mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12">
              <Image
                src="/assets/logo.jpeg"
                alt="Zanori"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="ml-3 text-2xl font-light tracking-wider">ZANORI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wide hover:opacity-60 transition-opacity uppercase"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-8">
            <button className="hover:opacity-60 transition-opacity hover:cursor-pointer" aria-label="Contact">
              <Phone size={25} />
            </button>
            <Link href="/cart" className="relative hover:opacity-60 transition-opacity hover:cursor-pointer" aria-label="Shopping Bag">
              <ShoppingBag size={25} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base tracking-wide hover:opacity-60 transition-opacity uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

