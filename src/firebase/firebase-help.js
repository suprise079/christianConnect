import app, { db } from './firebase';
import firebase from "firebase/compat/app";

import {
  deleteDoc, doc, addDoc, collection, where, query, getDocs, limit, updateDoc
} from 'firebase/firestore';


// get helping functions
import getCurTimeDate from '../components/helpFunc';
import { async } from '@firebase/util';






// THIS FUNCTION DELETES A NOTE DOCUMENT FROM FIREBASE.
// IT'S RECEIVE A COLLECTION NAME AND DOCUMENT ID
export const deleteDocument = async ( collec, id ) => {
  try {
    const ref = await deleteDoc( doc( db, collec, id )).then((r)=> {
      // console.log( "REF AFTER DEL NOTE: ",  r );
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


// edit user account, currently can only edit firstname, lastname and phone number
export const editUser = async (fn, ln, phone, id ) => {
  const usrref = doc( db, "Users", id );

  const r = await updateDoc( usrref, {
    firstname: fn,
    lastname: ln,
    phoneNumber: phone
  });
  // console.log( r )
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
  wannaBeLeader,
  premiun
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
      isPremiun: premiun
    });
    // console.log(ref);
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

  if( uid ) {
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
    catch(e) { console.error("Error Getting User Notes:", e ); return null; }
  }
  
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


// GETS ALL THE FELLOWSHIPS FROM FIREBASE
export const getAllFellowships = async() => {
  const fsRef = await getDocs( collection( db, "Fellowships" ) )

  var data = [];
  fsRef.docs.map( doc => {
    var d = doc.data();
    d["id"] = doc.id;
    data.push( d )
  })
  if( data.length > 0 ) return data; // return all the fellowships.
  else { return null } // return null 
}


// ADD OR UPDATE USERS PROFILE PIC
// receives user id from auth and a photo string
export const addProfileImg = async ( uid, photo ) => {
  try {
    const ref = await addDoc( collection(db, "userProfilePic"), {
      userId: uid,
      photo: photo
    })
    if( ref.id ) return true
  }
  catch( err ) {
    console.error("Adding Pic", err ); return false; }
} 


// edit user account, currently can only edit firstname, lastname and phone number
export const updateProfileImg = async ( uid, photo ) => {
  try {
    const q = query( collection(db, "userProfilePic"),
    where("userId", "==", uid), limit(1));
  
    const ref = await getDocs( q );

    var id;
    ref.docs.map( doc => id = doc.id )
    if( id ) {
      const usrref = doc( db, "userProfilePic", id );
      await updateDoc( usrref, {
        photo: photo
      });
    } else{ console.error("NO IMAGE ID") }
  }
  catch( err ) {
    console.error( err )
  }
  // console.log( r )
}


// get user profile image from firebase
// receives the user id from auth
export const getUserImg = async( uid ) => {
  // console.log( "HERE", uid )
  // make a query to get user image from user profile pic, where user id
  // = to params user id and the limit is one
  try {
    const q = query( collection(db, "userProfilePic" ),
    where("userId", "==", uid ) )
  
    const res = await getDocs( q );

    var data = [];
    res.docs.map( doc => {
      var d = doc.data();
      d["id"] = doc.id;
      data.push( d )
    })
    // console.log( data[0] )
    if( data.length > 0 ) return data[0]
    else { return false }
  }
  catch( err ) {
    console.error("getting user profile::", err )
    return false;
  }
  
}


// update a fellowship details
export const editFS = async ( id, name, about, loc, time ) => {
  try{
    // console.log("sjdfsjd");
    await updateDoc( doc(db, "Fellowships", id), {
      name: name,
      about: about,
      location: loc,
      time: time
    })
  }
  catch( err ) { console.error( "updating fellowship", err ) }
}


// add a review about a fellowship to review collection
export const AddReview = async( uid, fsid, stars, text ) => {
  try {
    const refDoc = await addDoc( collection(db, "Reviews"), {
      text: text,
      userId: uid,
      fsId: fsid,
      stars: stars,
      date: getCurTimeDate(),
    })
    if( refDoc.id ) return true;
    else { return false }
  }
  catch( err ) {
    console.log("adding review ERROR")
    return false;
  }
}


// get all reviews from reviews table.
export const getReviews = async() => {
  try {
    const ref = await getDocs( collection(db, "Reviews") );
    var data = [];
    ref.docs.map( doc => {
      var d = doc.data();
      d["id"] = doc.id;
      data.push( d );
    })
    // console.log( data )
    if( data.length >= 0 ) return data;
    else { return false }
  }
  catch( err ) { console.error("get reviews error"); return false }
}
























export default firebase;