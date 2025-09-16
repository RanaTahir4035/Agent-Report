
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3tSSH-hA8xmTBBZ0mca74h2vQ27_TNiM",
  authDomain: "agent-27d96.firebaseapp.com",
  projectId: "agent-27d96",
  storageBucket: "agent-27d96.firebasestorage.app",
  messagingSenderId: "737229014643",
  appId: "1:737229014643:web:562011adcdd45a488f0c06",
  measurementId: "G-DRFQQRBZVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);