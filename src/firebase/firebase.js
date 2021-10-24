import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore,
  getDocs,
  collection,
  getDoc, 
  doc
} from "firebase/firestore";





const firebaseConfig = {
  // TEST PROJECT
  // apiKey: "AIzaSyCbnuZBt-f_XfPdPcCyqljlAKbl5ShvfVA",
  // authDomain: "christian-connect-test.firebaseapp.com",
  // projectId: "christian-connect-test",
  // storageBucket: "christian-connect-test.appspot.com",
  // messagingSenderId: "1092083350412",
  // appId: "1:1092083350412:web:3d6b6de90b5d682307b4a9"

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





// THIS FUNCTION GET ALL THE DATA IN notes COLLECTION
export const getAllNotes = async () => {
  var data = [];

  try { // get a reference to firebase doc
    const ref = await getDocs( collection( db , "notes"));
    ref.forEach( doc => {
      // console.log( doc.id + " => ", doc.data() )
      // push data into the an array to return.
      data.push({
        id: doc.id, // id of the doc online
        userId: doc.data().userId, // user who made this notes
        content: doc.data().content, // content of the notes
        time: doc.data().time, // time user made the notes
        title: doc.data().title, // title of the notes
      })
    })
    // console.log( "GET ALL NOTES FUNC: ", data ); // seeing purpose.
    // a filter will be applied once log in is settle.
    return data; // return notes to users.
  }
  catch( e ) {
    console.log("GETTING NOTES ERROR: ", e );
    return ;
  }
}








// THIS FUNCTION GETS A SINGLE NOTE DOC FROM FIREBASE.
// IT'S RECEIVE THE ID OR THE NODE.
// export const getOneNote = async ( id ) => {
  // db.collection('books').where('__name__', '==' ,'fK3ddutEpD2qQqRMXNW5').get(). 
  // const docRef = doc( firestoreObj, "notes", id );
  // const docSnap = await getDoc( docRef );
  // const docSnap = await firestoreObj.collection('notes').document(id).get() 
  // console.log( "GET ONE NOTE: ", docSnap.data() )
// } 



export default app ;
