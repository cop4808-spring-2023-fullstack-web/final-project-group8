import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../configs/firebase";
// import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export const useAuth = () => { return useContext(userAuthContext)};

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [signupError, setSignUpError] = useState("");
  // const navigate = useNavigate();

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        console.log(user); // log updated user object
      });
  }



  function signUp(email, password, firstName, lastName) {
    setSignUpError("");
    return createUserWithEmailAndPassword(auth, email, password) 

    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        setSignUpError("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        setSignUpError("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        setSignUpError("Password is too weak");
      } else {
        setSignUpError(error.message);
      }
    });
}

  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);
  

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

