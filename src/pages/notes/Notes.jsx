import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonCard, IonSearchbar, IonApp, IonPage } from '@ionic/react';
import { IoMdArrowBack } from 'react-icons/io'
import { GrAdd } from 'react-icons/gr'
import "./Notes.css";
// import NoteContent from "./NoteContent";

// import firebase functions and classes
import { auth } from "../../firebase/firebase";
import { getUserNotes } from "../../firebase/firebase-help";





const Notes = () => {
  // search notes
  const [searchNote, setSearchNote] = useState('');
  // Show Notes
  const [notes, setNotes] = useState();
  const history = useHistory(); // use to route dynamically
  const [ user, setUser ] = useState();



  useEffect(() => {
    // console.log( auth.currentUser?.providerData[0].displayName )
    // get the value of auth.current user that keeps user's data.
    var d = JSON.parse( auth.currentUser?.providerData[0].displayName );
    // console.log( d ); // for debuggin purposes
    setUser( d ) // set user for this page
    // get current user notes.. after the promise is returned
    // set current user notes to local state var.
    getUserNotes( d.userId ).then( setNotes )
  }, [] )
  


  return (
    <IonPage id='mainContainer'>
      
      {/* header */}
      <IonHeader id='header'>
        {/* back arrow */}
        <Link to='/profile'><IoMdArrowBack id='backIcon' /></Link>

        {/* title */}
        <IonToolbar>  
          <IonTitle id='title'>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id='notesContainer'>

        {/* search */}
        <IonSearchbar id='searchNotes' value={searchNote} onIonChange={e => setSearchNote(e.detail.value)}></IonSearchbar>

        {/* map all users notes */}
        {
          notes ? notes.map((note,i) => (
            <>
              <IonCard key={i} className='noteCards' >

                {/* note title */}
                <h3  onClick={(e) =>{ }} ><Link className='noteTitle' to={'/viewnotes?id=' + note.id }>{note.title}</Link></h3>

                {/* date created */}
                <small className='noteDate'>{note.time}</small>
              </IonCard>
            </>
            )
          ) : ( <h2>loading...</h2> )
        }

        {/* add note button */}
        <Link to='./addnote'> <GrAdd id='addNote' /> </Link>

      </div>

    </IonPage>
  );
}

export default Notes;
