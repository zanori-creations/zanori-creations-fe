import React from 'react';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return productsData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: PageProps) {
  const category = productsData.categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  const products = productsData.products.filter(
    (product) => product.category === category.id
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:opacity-60 transition-opacity">
                Home
              </a>
            </li>
            <li>
              <span className="mx-2">&gt;</span>
            </li>
            <li className="uppercase">{category.name}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-2 uppercase">
              {category.name}
            </h1>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
            <button className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors uppercase">
              Filter & Sort
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No products available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

