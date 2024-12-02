
import firebase  from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAsdfw93sbHpYNseLXE5910q3ebjNIS79s",
  authDomain: "jobapp-1f201.firebaseapp.com",
  projectId: "jobapp-1f201",
  storageBucket: "jobapp-1f201.firebasestorage.app",
  messagingSenderId: "301346611180",
  appId: "1:301346611180:web:63f3d3e83e00a6a4486ac9",
  measurementId: "G-GTBEPC29D6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getDatabase(app);