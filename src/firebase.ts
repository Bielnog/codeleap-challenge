import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaklzopPtMBv30SZ4s9tnnFsU2aWlpk28",
  authDomain: "codeleap-challenge.firebaseapp.com",
  projectId: "codeleap-challenge",
  storageBucket: "codeleap-challenge.firebasestorage.app",
  messagingSenderId: "509346027169",
  appId: "1:509346027169:web:3c4fdfe21d12dc104342e0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
