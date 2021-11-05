import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonCard,
  IonSearchbar, IonPage, IonContent
} from '@ionic/react';
import { IoMdArrowBack } from 'react-icons/io'
import { GrAdd } from 'react-icons/gr'
import "./Notes.css";
// import NoteContent from "./NoteContent";

// import firebase functions and classes
import { auth } from "../../firebase/firebase";
import { getUserNotes } from "../../firebase/firebase-help";
import Context from "../../context/Context";
import Cookies from "js-cookie";




const Notes = () => {
  const { curUser, setCurUser } = useContext( Context );
  // search notes
  const [searchNote, setSearchNote] = useState('');
  // Show Notes
  const [notes, setNotes] = useState();
  const history = useHistory(); // use to route dynamically



  useEffect(() => {
    // get user's data from session........
    setCurUser( JSON.parse( Cookies.get("userData") ) );
    // get user's notes from firebase.......
    getUserNotes( curUser?.userId ).then( setNotes )
  }, [] )
  


  return (
    <IonPage id='notesMainContainer'>
      
      {/* header */}
      <IonHeader id='header'>
        {/* back arrow */}
        <Link to='/profile'><IoMdArrowBack id='backIcon' /></Link>

        {/* title */}
        <IonToolbar>  
          <IonTitle id='title'>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <div id='notesContainer'>

        {/* search */}
        <IonSearchbar id='searchNotes' value={searchNote} onIonChange={e => setSearchNote(e.detail.value)}></IonSearchbar>

        {/* map all users notes */}
        {
          notes && notes.length > 0 ? notes.map((note,i) => (
            <IonCard key={i} className='noteCards' >

              {/* note title */}
              <h3  onClick={(e) =>{ }} >
                <Link className='noteTitle' to={'/viewnotes?id=' + note.id }>
                  {note.title}</Link></h3>

              {/* date created */}
              <small className='noteDate'>{note.time}</small>
            </IonCard>
            )
          ) : ( <h2 style={{textAlign:"center"}} >
            No Notes For <span style={{textTransform:"capitalize"}} >
              { curUser?.firstname } </span></h2> )
        }

        {/* add note button */}
        <button id="addNotesbtn" onClick={ e=> history.push("/addnote") } >
          Add Note <span className='addNoteIcon' > + </span>
          {/* <GrAdd className='addNoteIcon' />  */}
        </button>
        {/* <Link id="addNotesbtn" to='/addnote'> </Link> */}

        </div>
      
      </IonContent>
      
    </IonPage>
  );
}

export default Notes;
