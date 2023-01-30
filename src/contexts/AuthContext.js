import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import getUserAPI from "../api/getUserAPI";

const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// Provider part
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook to get the auth object
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook to handle auth and state
const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      setUser(response.user);
      localStorage.setItem("token", response.user.accessToken);
      localStorage.setItem("displayName", response.user.displayName);
      return response.user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", response.user.accessToken);
      localStorage.setItem("displayName", response.user.displayName);
      setUser(response.user);
      await getUserAPI(response.user.uid);
      return response.user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response.user);
      return response.user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(false);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("token", user.accessToken);
      } else {
        setUser(false);
        localStorage.clear();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // return the objects

  return {
    user,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };
};
