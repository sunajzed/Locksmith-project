import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider ,} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOa90gchRIukS9XyfipwNvW89kVqWRJm4",
  authDomain: "lockquick-6f1b8.firebaseapp.com",
  projectId: "lockquick-6f1b8",
  storageBucket: "lockquick-6f1b8.firebasestorage.app",
  messagingSenderId: "772601078019",
  appId: "1:772601078019:web:4fc59af1c66055ff8c0936",
  measurementId: "G-D1FMNP5HVD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
