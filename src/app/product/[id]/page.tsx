'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import productsData from '@/data/products.json';
import { useCartStore } from '@/store/cartStore';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = productsData.products.find((p) => p.id === params.id);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const color = selectedColor || product.colors[0];
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: color,
      image: product.image,
    });

    toast.success(`Added ${product.name} to cart!\nSize: ${selectedSize}\nColor: ${color}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:opacity-60 transition-opacity">
                Homepage
              </Link>
            </li>
            <li>
              <span className="mx-2">&gt;</span>
            </li>
            <li>
              <Link href={`/category/${product.category}`} className="hover:opacity-60 transition-opacity uppercase">
                {product.category.replace('-', ' ')}
              </Link>
            </li>
            <li>
              <span className="mx-2">&gt;</span>
            </li>
            <li className="uppercase">Clothing</li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square bg-gray-100 ${
                      index === currentImageIndex ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h1 className="text-3xl font-light tracking-wide mb-4">{product.name}</h1>

            {/* Color */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm mb-3">
                  Color: <span className="font-light">{selectedColor || product.colors[0]}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-12 h-12 border ${
                        selectedColor === color || (!selectedColor && color === product.colors[0])
                          ? 'border-black border-2'
                          : 'border-gray-300'
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={color}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm">
                  {selectedSize ? `Size: ${selectedSize}` : 'Please select a size'}
                </p>
                <button className="text-sm underline hover:opacity-60">Size guide</button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm border transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-2xl font-light">{formatPrice(product.price)}</p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors mb-8"
            >
              Add to Cart
            </button>

            {/* Product Details Accordion */}
            <div className="border-t border-gray-200">
              <details className="group py-6 border-b border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm tracking-wider uppercase">Product details</span>
                  <svg
                    className="w-5 h-5 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                  <p>{product.description}</p>
                </div>
              </details>

              <details className="group py-6 border-b border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm tracking-wider uppercase">Delivery & Returns</span>
                  <svg
                    className="w-5 h-5 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                  <p>Free standard delivery on orders over ₦100,000. Returns accepted within 30 days.</p>
                </div>
              </details>

              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm tracking-wider uppercase">Gift packaging</span>
                  <svg
                    className="w-5 h-5 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                  <p>Complimentary gift packaging available at checkout.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

