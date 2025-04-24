import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRXD4N7ylkz6fJF7KIDfCOotDLv8blihk",
  authDomain: "locksmithlogin-73457.firebaseapp.com",
  projectId: "locksmithlogin-73457",
  storageBucket: "locksmithlogin-73457.firebasestorage.app",
  messagingSenderId: "591277753287",
  appId: "1:591277753287:web:eba5af51a198b94dee0fe2",
  measurementId: "G-BPVFTW6GJB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
