import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    if (auth.app.options.apiKey === 'mock-api-key') {
      const mockUid = 'mock-user-' + btoa(email);
      const mockUser = { uid: mockUid, email, displayName: 'Mock User' };
      setCurrentUser(mockUser);
      localStorage.setItem('mockToken', mockUid);
      return Promise.resolve({ user: mockUser });
    }
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    if (auth.app.options.apiKey === 'mock-api-key') {
      const mockUid = 'mock-user-' + btoa(email);
      const mockUser = { uid: mockUid, email, displayName: 'Mock User' };
      setCurrentUser(mockUser);
      localStorage.setItem('mockToken', mockUid);
      return Promise.resolve({ user: mockUser });
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (auth.app.options.apiKey === 'mock-api-key') {
      setCurrentUser(null);
      localStorage.removeItem('mockToken');
      return Promise.resolve();
    }
    return signOut(auth);
  }

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (auth.app.options.apiKey === 'mock-api-key') {
        // In mock mode, we manage state manually, restore from localStorage if possible
        const storedUid = localStorage.getItem('mockToken');
        if (storedUid) {
          setCurrentUser({ uid: storedUid, email: 'mock@example.com', displayName: 'Mock User' });
        }
        setLoading(false);
        return;
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
