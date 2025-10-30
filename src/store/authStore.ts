import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  phoneNumber: string;
  countryCode: string;
  fullName: string;
  country: string;
  address: string;
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  
  // Auth methods
  signUp: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  signIn: (phoneNumber: string, countryCode: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  
  // Profile methods
  updateProfile: (userData: Partial<Omit<User, 'id' | 'createdAt'>>) => Promise<{ success: boolean; error?: string }>;
}

// This is the abstraction layer - easy to replace with Firebase
class AuthService {
  // LocalStorage implementation
  static async signUp(userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Check if user already exists
      const existingUsers = this.getAllUsers();
      const userExists = existingUsers.find(
        (u) => u.phoneNumber === userData.phoneNumber && u.countryCode === userData.countryCode
      );

      if (userExists) {
        return { success: false, error: 'User with this phone number already exists' };
      }

      // Create new user
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('zanori_users', JSON.stringify(existingUsers));

      return { success: true, user: newUser };
    } catch {
      return { success: false, error: 'Failed to create account' };
    }
  }

  static async signIn(phoneNumber: string, countryCode: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const users = this.getAllUsers();
      const user = users.find(
        (u) => u.phoneNumber === phoneNumber && u.countryCode === countryCode
      );

      if (!user) {
        return { success: false, error: 'User not found. Please sign up first.' };
      }

      return { success: true, user };
    } catch {
      return { success: false, error: 'Failed to sign in' };
    }
  }

  static async updateProfile(userId: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('zanori_users', JSON.stringify(users));

      return { success: true, user: users[userIndex] };
    } catch {
      return { success: false, error: 'Failed to update profile' };
    }
  }

  private static getAllUsers(): User[] {
    try {
      const users = localStorage.getItem('zanori_users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }
}

// To replace with Firebase, just update the AuthService methods above
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signUp: async (userData) => {
        const result = await AuthService.signUp(userData);
        
        if (result.success && result.user) {
          set({ user: result.user, isAuthenticated: true });
        }
        
        return { success: result.success, error: result.error };
      },

      signIn: async (phoneNumber, countryCode) => {
        const result = await AuthService.signIn(phoneNumber, countryCode);
        
        if (result.success && result.user) {
          set({ user: result.user, isAuthenticated: true });
        }
        
        return { success: result.success, error: result.error };
      },

      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (userData) => {
        const currentUser = get().user;
        if (!currentUser) {
          return { success: false, error: 'No user logged in' };
        }

        const result = await AuthService.updateProfile(currentUser.id, userData);
        
        if (result.success && result.user) {
          set({ user: result.user });
        }
        
        return { success: result.success, error: result.error };
      },
    }),
    {
      name: 'zanori-auth-storage',
    }
  )
);

