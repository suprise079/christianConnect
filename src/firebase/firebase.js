import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAxrKpkqiDXRktX1bRNsNBHziX0wt-vkCA",
  authDomain: "christianconnect-93584.firebaseapp.com",
  databaseURL: "https://christianconnect-93584-default-rtdb.firebaseio.com",
  projectId: "christianconnect-93584",
  storageBucket: "christianconnect-93584.appspot.com",
  messagingSenderId: "1001005533050",
  appId: "1:1001005533050:web:f89041f7d6358ebe3f78c3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export { app };
