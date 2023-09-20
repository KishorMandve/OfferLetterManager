import { User, UserCredential } from 'firebase/auth';
import React, { useContext, useState } from 'react'

interface Auth {
  currentUser: User
  login: Promise<UserCredential>
  logout: Promise<void>
}

const AuthContext = React.createContext<Auth | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [currentUser, setCurrentUser] = useState();

  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  );
}