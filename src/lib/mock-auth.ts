// Mock authentication system using localStorage
// Replaces NextAuth for frontend-only operation

import { getUserByEmail, type MockUser } from './mock-users';

const STORAGE_KEY = 'booker_session';

export type MockSession = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  expires: string;
};

export function signIn(email: string, password: string): { success: boolean; error?: string } {
  const user = getUserByEmail(email);
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  if (user.password !== password) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  // Create session
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // 24 hour session
  
  const session: MockSession = {
    user: {
      id: user.id,
      email: user.email,
      name: user.full_name,
    },
    expires: expires.toISOString(),
  };
  
  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    // Also store full user data for easy access
    localStorage.setItem('booker_user', JSON.stringify(user));
  }
  
  return { success: true };
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('booker_user');
  }
}

export function getSession(): MockSession | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionStr = localStorage.getItem(STORAGE_KEY);
    if (!sessionStr) return null;
    
    const session: MockSession = JSON.parse(sessionStr);
    
    // Check if expired
    if (new Date(session.expires) < new Date()) {
      signOut();
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

export function getUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStr = localStorage.getItem('booker_user');
    if (!userStr) return null;
    
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// React hook equivalent (for client components)
// Note: This needs to be used with useState/useEffect in components for reactivity
export function useMockSession(): { data: MockSession | null; status: 'authenticated' | 'unauthenticated' } {
  if (typeof window === 'undefined') {
    return { data: null, status: 'unauthenticated' };
  }
  
  // For simplicity, read directly from localStorage
  // In a real implementation, you'd use useState/useEffect, but this works for prototype
  const session = getSession();
  return {
    data: session,
    status: session ? 'authenticated' : 'unauthenticated',
  };
}

