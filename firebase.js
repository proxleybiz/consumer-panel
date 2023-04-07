import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1hV-2QIcAxvRpXsFr5EzeJTK9467E6L0",
  authDomain: "proxley-462e6.firebaseapp.com",
  projectId: "proxley-462e6",
  storageBucket: "proxley-462e6.appspot.com",
  messagingSenderId: "20574225764",
  appId: "1:20574225764:web:cab8f9545b931ae0f76671",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
