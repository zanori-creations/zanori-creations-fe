'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const countryCodes = [
  { code: '+234', country: 'Nigeria' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+233', country: 'Ghana' },
  { code: '+254', country: 'Kenya' },
  { code: '+27', country: 'South Africa' },
];

const countries = [
  'Nigeria',
  'United States',
  'United Kingdom',
  'Ghana',
  'Kenya',
  'South Africa',
  'Other',
];

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    countryCode: '+234',
    phoneNumber: '',
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    countryCode: '+234',
    phoneNumber: '',
    fullName: '',
    country: 'Nigeria',
    address: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInData.phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    setLoading(true);
    const result = await signIn(signInData.phoneNumber, signInData.countryCode);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      onClose();
    } else {
      toast.error(result.error || 'Sign in failed');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.phoneNumber || !signUpData.fullName || !signUpData.country || !signUpData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await signUp(signUpData);
    setLoading(false);

    if (result.success) {
      toast.success('Account created successfully!');
      onClose();
    } else {
      toast.error(result.error || 'Sign up failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-60 transition-opacity"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-light tracking-wider mb-6 uppercase">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>

          {/* Toggle Mode */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setMode('signin')}
              className={`pb-2 text-sm tracking-wider uppercase transition-colors ${
                mode === 'signin' ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`pb-2 text-sm tracking-wider uppercase transition-colors ${
                mode === 'signup' ? 'border-b-2 border-black' : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Form */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={signInData.countryCode}
                    onChange={(e) => setSignInData({ ...signInData, countryCode: e.target.value })}
                    className="px-3 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={signInData.phoneNumber}
                    onChange={(e) => setSignInData({ ...signInData, phoneNumber: e.target.value })}
                    placeholder="8012345678"
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <p className="text-sm text-center text-gray-600">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="underline hover:opacity-60"
                >
                  Sign Up
                </button>
              </p>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number *</label>
                <div className="flex gap-2">
                  <select
                    value={signUpData.countryCode}
                    onChange={(e) => setSignUpData({ ...signUpData, countryCode: e.target.value })}
                    className="px-3 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={signUpData.phoneNumber}
                    onChange={(e) => setSignUpData({ ...signUpData, phoneNumber: e.target.value })}
                    placeholder="8012345678"
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Country *</label>
                <select
                  value={signUpData.country}
                  onChange={(e) => setSignUpData({ ...signUpData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                  required
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Address *</label>
                <textarea
                  value={signUpData.address}
                  onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                  placeholder="Enter your full address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="underline hover:opacity-60"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

