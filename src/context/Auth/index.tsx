import React, { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "../../lib/firebase";
import Loader from "../../components/Loader";

interface AuthContext {
  userId: string | null;
  setUserId: (id: string) => void;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContext>({} as unknown as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUserId(user.uid);
          setLoading(false);
        } else {
          setUserId(null);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error detecting auth state:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserId(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // while the auth is loading show a loader for better UX experience
  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ userId, setUserId, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
