'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import AuthModal from '@/components/AuthModal';

export default function CartPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  
  const { isAuthenticated, user } = useAuthStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemoveItem = (id: string, size: string, color: string, name: string) => {
    removeItem(id, size, color);
    toast.success(`Removed ${name} from cart`);
  };

  const handleIncreaseQuantity = (id: string, size: string, color: string) => {
    increaseQuantity(id, size, color);
    toast.success('Quantity increased');
  };

  const handleDecreaseQuantity = (id: string, size: string, color: string, name: string) => {
    const item = items.find((i) => i.id === id && i.size === size && i.color === color);
    if (item && item.quantity === 1) {
      toast.success(`Removed ${name} from cart`);
    } else {
      toast.success('Quantity decreased');
    }
    decreaseQuantity(id, size, color);
  };

  const handlePayNow = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      toast.error('Please sign in to complete your purchase');
      return;
    }

    // Proceed with payment (placeholder for now)
    toast.success(`Processing payment for ${user?.fullName}...`);
    // Here you would integrate with your payment gateway
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-light tracking-wider mb-8 uppercase">Shopping Bag</h1>

          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={64} className="text-gray-300 mb-6" />
            <h2 className="text-xl font-light mb-4">Your shopping bag is empty</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Start adding items to your bag to see them here
            </p>
            <Link
              href="/"
              className="bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wider uppercase">Shopping Bag</h1>
          <p className="text-gray-600">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 border-b border-gray-200 pb-6"
              >
                {/* Product Image */}
                <div className="relative w-32 h-40 flex-shrink-0 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-light mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Size: {item.size}</p>
                    <p className="text-sm text-gray-600 mb-1">Color: {item.color}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-3 mt-3">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id, item.size, item.color, item.name)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors text-lg font-light"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id, item.size, item.color)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors text-lg font-light"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="text-lg font-light">{formatPrice(item.price * item.quantity)}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id, item.size, item.color, item.name)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 hover:cursor-pointer transition-colors mt-4 w-fit"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
              <h2 className="text-xl font-light mb-6 uppercase tracking-wider">Order Summary</h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-light mb-6">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handlePayNow}
                className="w-full bg-black text-white py-4 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors mb-3"
              >
                Pay Now
              </button>

              {/* Continue Shopping */}
              <Link
                href="/"
                className="block w-full text-center border border-black py-4 text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </div>
  );
}

