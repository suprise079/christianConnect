import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyAR1t2HTM6AB71zi4_4QH_odi9hMxVoeyk",

  authDomain: "christianconnect-c4641.firebaseapp.com",

  projectId: "christianconnect-c4641",

  storageBucket: "christianconnect-c4641.appspot.com",

  messagingSenderId: "680574751815",

  appId: "1:680574751815:web:219d96a3b2e914101f4d62"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export {app};