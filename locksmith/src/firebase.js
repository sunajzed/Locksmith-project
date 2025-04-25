import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider ,} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD88oFxoTkkbMcPjx9CJXfgM9vBtfUcb3Q",
  authDomain: "lockquick-a63b9.firebaseapp.com",
  projectId: "lockquick-a63b9",
  storageBucket: "lockquick-a63b9.firebasestorage.app",
  messagingSenderId: "1093365062268",
  appId: "1:1093365062268:web:cb4c409dfee4027a6747f9",
  measurementId: "G-ZM8MWN02W4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
