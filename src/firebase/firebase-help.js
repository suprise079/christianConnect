import app, { db } from './firebase';
import firebase from "firebase/compat/app";

import {
  deleteDoc, doc, addDoc, collection, where, query, getDocs, limit, docs
} from 'firebase/firestore';



// THIS FUNCTION DELETES A NOTE DOCUMENT FROM FIREBASE.
// IT'S RECEIVE A COLLECTION NAME AND DOCUMENT ID
export const deleteDocument = async ( collec, id ) => {
  try {
    const ref = await deleteDoc( doc( db, collec, id )).then((r)=> {
      console.log( "REF AFTER DEL NOTE: ",  r );
    });
  }
  catch( e ) {
    console.log("DELETING ERROR: ", e );
    alert("Deleting Error");
  }
}




// func to upload users data to firestore
// receives email, firstname(fname), lastname, password, phone numbe
// profile photo, registration date and user id from authentication to ref
// usser data in firestore
export const registerUser = async ( email, fname, lname, pwd, phone, regDate, uid ) => {
  var isReg = false;
  try {
    const ref = await addDoc( collection( db, "Users" ), {
      email: email,
      firstname: fname,
      lastname: lname,
      password: pwd,
      phoneNumber: phone,
      profilePic: "",
      regDate: regDate,
      userId: uid
    });
    if( ref.id ) isReg = true;
  }
  catch( error ) {
    console.log("ERROR: ", error ); isReg = false
  }
  return isReg;
}


// after user is logged in, get user data for use from firebase.
// receives an id and email of user.
export const LoginUser = async ( uid ) => {
  var data = [];
  try {
    const q = query(collection( db, "Users" ), where("userId", "==", uid ), limit(1));
    const snapShot = await getDocs( q );
    snapShot.docs.map( doc => {
      var d = doc.data();
      d["id"] = doc.id;
      data.push( d );
      // console.log( data );
    })
  }
  catch( error ) {
    console.log("ERROR:", error )
    return null;
  }
  // console.log( data )
  return data[0]
}



// func to upload leaders data to firestore
// receives email, firstname(fname), lastname, password, phone numbe
// profile photo, registration date and user id from authentication to ref
// usser data in firestore
export const registerLeader = async ( email, fname, lname, pwd, phone, regDate, uid ) => {

  var isReg = false;

  try {
    const ref = await addDoc( collection( db, "Users" ), {
      email: email,
      firstname: fname,
      lastname: lname,
      password: pwd,
      phoneNumber: phone,
      profilePic: "",
      regDate: regDate,
      userId: uid
    });
    if( ref.id ) isReg = true;
  }
  catch( error ) {
    console.log("ERROR: ", error );
    isReg = false
  }

  return isReg;
}

