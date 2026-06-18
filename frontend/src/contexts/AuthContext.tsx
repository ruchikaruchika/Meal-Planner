import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { User, UserPreferences } from '@/types/types';
import { DEMO_EMAIL, DEMO_PASSWORD, demoUser, demoPlan, demoGroceryList } from '@/constants/demo-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: () => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updatePreferences: (preferences: UserPreferences) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'smartmeal_users';
const SESSION_KEY = 'smartmeal_session';
const PLAN_STORAGE_KEY = 'smartmeal_plan';
const GROCERY_STORAGE_KEY = 'smartmeal_grocery';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      try {
        const parsedUser = JSON.parse(sessionData);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; user: User }> => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  };

  const saveUsers = (users: Record<string, { password: string; user: User }>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for demo account
    if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      return loginAsDemo();
    }
    
    const users = getUsers();
    const userData = users[email.toLowerCase()];
    
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const loginAsDemo = async (): Promise<boolean> => {
    // Set demo user
    setUser(demoUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(demoUser));
    
    // Pre-populate meal plan and grocery list
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(demoPlan));
    localStorage.setItem(GROCERY_STORAGE_KEY, JSON.stringify(demoGroceryList));
    
    return true;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = getUsers();
    const emailLower = email.toLowerCase();
    
    if (users[emailLower]) {
      return false; // User already exists
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: emailLower,
      name,
    };

    users[emailLower] = { password, user: newUser };
    saveUsers(users);
    
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updatePreferences = (preferences: UserPreferences) => {
    if (!user) return;
    
    const updatedUser = { ...user, preferences };
    setUser(updatedUser);
    
    // Update in storage
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].user = updatedUser;
      saveUsers(users);
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginAsDemo,
    register,
    logout,
    updatePreferences,
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
