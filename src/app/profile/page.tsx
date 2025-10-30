'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, signOut, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    countryCode: '',
    country: '',
    address: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (user) {
      setFormData({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        country: user.country,
        address: user.address,
      });
    }
  }, [isAuthenticated, user, router]);

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully');
    router.push('/');
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.country || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await updateProfile({
      fullName: formData.fullName,
      country: formData.country,
      address: formData.address,
    });
    setLoading(false);

    if (result.success) {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        country: user.country,
        address: user.address,
      });
    }
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wider uppercase">My Profile</h1>
          <Link
            href="/"
            className="text-sm hover:opacity-60 transition-opacity uppercase tracking-wider"
          >
            Back to Home
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-light">{user.fullName}</h2>
                <p className="text-sm text-gray-600">
                  {user.countryCode} {user.phoneNumber}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors text-sm"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors text-sm"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm disabled:opacity-50"
                >
                  <Save size={16} />
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                />
              ) : (
                <p className="text-base">{user.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
              <p className="text-base text-gray-400">
                {user.countryCode} {user.phoneNumber} (Cannot be changed)
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
                />
              ) : (
                <p className="text-base">{user.country}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm resize-none"
                />
              ) : (
                <p className="text-base">{user.address}</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Member since: {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-4 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-sm tracking-wider uppercase"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

