import app, { db } from './firebase';
import firebase from "firebase/compat/app";

import {
  deleteDoc, doc, addDoc, collection, where, query, getDocs, limit, docs
} from 'firebase/firestore';


// get helping functions
import getCurTimeDate from '../components/helpFunc';
import { async } from '@firebase/util';






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

    // console.log( data )
    return data[0]
  }
  catch( error ) {
    console.log("ERROR:", error )
    return null;
  }
  
}



// func to upload users data to firestore
// receives email, firstname(fname), lastname, password, phone numbe
// profile photo, registration date and user id from authentication to ref
// usser data in firestore
export const registerUser = async (
  email,
  fname,
  lname,
  pwd,
  phone,
  uid,
  fsName,
  wannaBeLeader
) => {
  var isReg = false;
  try {
    const ref = await addDoc(collection(db, "Users"), {
      email: email,
      firstname: fname,
      lastname: lname,
      password: pwd,
      phoneNumber: phone,
      profilePic: "",
      regDate: getCurTimeDate(),
      userId: uid,
      isLeader: wannaBeLeader,
    });
    console.log(ref);
    isReg = ref.id ?? true;
    if (ref.id && wannaBeLeader) {
      const fSRef = await addDoc(collection(db, "Fellowships"), {
        name: fsName,
        leaderId: uid,
        about: "",
        registrationDate: getCurTimeDate(),
        time: "",
        location: "",
        photo: "",
      });
    }
  } catch (error) {
    console.log("ERROR: ", error);
    isReg = false;
  }
  return isReg;
};



// get leaders fellowship details from firestore.
// receives a leaders user id from firebase auth
export const getLeaderFs = async( uid ) => {

  var data = [];

  try {
    const q = query( collection(db, "Fellowships"), where("leaderId", "==", uid ) );
    const ref = await getDocs( q );

    ref.docs.map( doc => {
      var d = doc.data();
      d["id"] = doc.id;
      data.push( d )
    })
    return data[0];
  }
  catch( error ) {
    console.error("ERROR:", error );
    return null;
  }
}

















// ADDS A NOTE TO NOTES TABLE, RECEIVES, NOTECONTENT
// note title and auth user id, it calls func that
// return time and date
export const addNotes = async ( nc, nt, uid ) => {

  try {
    const ref = await addDoc( collection(db, "notes"), {
      content: nc,
      time: getCurTimeDate(),
      title: nt,
      userId: uid,
    })
    return ref;	
  }
  catch( e ) { // if there is an error
    console.log( e );
    return null; // return null
  }	
} 

//
// USED TO GET NOTES THAT BELONGS TO A SINGLE USER
export const getUserNotes = async ( uid ) => {
  var data = [];

  try { // get all notes, where user id, == receives user id
    const q = query( collection( db, "notes"), where("userId", "==", uid));
    const ref = await getDocs( q ); // get the notes documents

    ref.docs.map( doc => { // map to go over all of em
      // console.log( doc.data() );
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
  catch(e) { console.error("Error Getting Notes:", e ); return null; }
}


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
  catch( e ) { console.error("GETTING NOTES ERROR: ", e ); return ; }
}


export default firebase;