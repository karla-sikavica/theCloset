import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbHQdx6UcrnGOItmjSgqMahJKQc3tssx8",
  authDomain: "thecloset-7ba5e.firebaseapp.com",
  projectId: "thecloset-7ba5e",
  storageBucket: "thecloset-7ba5e.firebasestorage.app",
  messagingSenderId: "77195632073",
  appId: "1:77195632073:web:69fd94b7e825471e71dc18",
  measurementId: "G-8GEFS4DWQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//const analytics = getAnalytics(app);