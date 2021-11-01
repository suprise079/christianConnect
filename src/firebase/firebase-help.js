import app from './firebase';
import { firestoreObj } from './firebase';
import firebase from "firebase/compat/app";

import {
  deleteDoc, doc
} from '@firebase/firestore';

import "@firebase/firestore";




// THIS FUNCTION DELETES A NOTE DOCUMENT FROM FIREBASE.
// IT'S RECEIVE A COLLECTION NAME AND DOCUMENT ID
export const deleteDocument = async ( collec, id ) => {
  try {
    const ref = await deleteDoc( doc( firestoreObj, collec, id )).then((r)=> {
      console.log( "REF AFTER DEL NOTE: ",  r );
    });
  }
  catch( e ) {
    console.log("DELETING ERROR: ", e );
    alert("Deleting Error");
  }
  
  
}



// 
// export default DbFirestore;




