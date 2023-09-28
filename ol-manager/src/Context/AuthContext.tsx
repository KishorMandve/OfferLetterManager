"use client"

import { Loading } from '@/app/components/Loading';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { auth } from "../firebase/firebase";

interface AuthUser {
  user: User | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>
}

const LOGIN_PATH = "/login";

const AuthContext = createContext<AuthUser>({
  user: null,
  loading: true,
  setLoading: (): boolean => true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const effect = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push(LOGIN_PATH);
      }
    });

    return effect;
  }, []);

  useEffect(() => {
    setLoading((user == null) !== (pathname === LOGIN_PATH));
  }, [pathname, user]);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}