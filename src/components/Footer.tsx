'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-32 h-32">
              <Image
                src="/assets/logo.jpeg"
                alt="Zanori"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm tracking-wider uppercase mb-6">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Subscribe to the Zanori newsletter for information on collections, shows and
              other exclusive updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="E-mail*"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
              />
              <button
                className="px-6 bg-black text-white hover:bg-gray-800 transition-colors"
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Need Help */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4">NEED HELP?</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/customer-care" className="hover:opacity-60 transition-opacity">
                  Customer care
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:opacity-60 transition-opacity">
                  Returns & exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Zanori For You */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4">ZANORI FOR YOU</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/appointment" className="hover:opacity-60 transition-opacity">
                  Make an appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Inside Zanori */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4">INSIDE ZANORI</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sustainability" className="hover:opacity-60 transition-opacity">
                 Upcoming Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4">LEGAL AND COOKIES</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:opacity-60 transition-opacity">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-60 transition-opacity">
                  Privacy 
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Connect */}
        <div className="mb-8">
          <h4 className="text-sm tracking-wider uppercase mb-4">CONNECT</h4>
          <div className="flex space-x-4">

            <Link href="https://instagram.com" className="text-sm hover:opacity-60 transition-opacity">
              Instagram
            </Link>
            <Link href="https://tiktok.com" className="text-sm hover:opacity-60 transition-opacity">
              TikTok
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 pt-8 border-t border-gray-200">
          © {new Date().getFullYear()} Zanori. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

