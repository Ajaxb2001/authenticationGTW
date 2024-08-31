import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2Ms5XXC_fgBvDTgTLHk2thB4nzEpdhB4",
  authDomain: "tardlogin.firebaseapp.com",
  projectId: "tardlogin",
  storageBucket: "tardlogin.appspot.com",
  messagingSenderId: "595838782281",
  appId: "1:595838782281:web:de09b7b4632a684af9e898",
  measurementId: "G-QY2MC6H7YP",
};

/// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
