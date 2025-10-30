'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-sm tracking-wide group-hover:opacity-60 transition-opacity">
          {product.name}
        </h3>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="text-xs text-gray-500"
              >
                {index > 0 ? `+${product.colors!.length - 1}` : color}
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="text-sm font-light">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;

