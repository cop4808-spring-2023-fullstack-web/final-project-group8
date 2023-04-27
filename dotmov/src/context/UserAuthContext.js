import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { doc, setDoc} from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export const useAuth = () => { return useContext(userAuthContext)};

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(fullName, email, password) {
    
    createUserWithEmailAndPassword(auth, email, password)
  }

  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}