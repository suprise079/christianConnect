import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore,
  getDocs,
  collection,
  getDoc, 
  doc
} from "firebase/firestore";
import { async } from "@firebase/util";





const firebaseConfig = {

  // ORIGINAL PROJECT
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

// export firestore object
export const db = getFirestore( app );
// export firebase/auth object
export const auth = getAuth();



// THIS FUNCTION GETS A SINGLE NOTE DOC FROM FIREBASE.
// IT'S RECEIVE THE ID OR THE NODE.
// export const getOneNote = async ( id ) => {
  // db.collection('books').where('__name__', '==' ,'fK3ddutEpD2qQqRMXNW5').get(). 
  // const docRef = doc( firestoreObj, "notes", id );
  // const docSnap = await getDoc( docRef );
  // const docSnap = await firestoreObj.collection('notes').document(id).get() 
  // console.log( "GET ONE NOTE: ", docSnap.data() )
// } 



export default app;
