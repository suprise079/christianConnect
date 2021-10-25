import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonCard, IonSearchbar, IonApp } from '@ionic/react';
import { IoMdArrowBack } from 'react-icons/io'
import { GrAdd } from 'react-icons/gr'
import "./Notes.css";
// import NotesInfo from './notes.json'
// import NoteContent from "./NoteContent";

// import firebase functions and classes
import { getAllNotes } from "../../firebase/firebase";





function Notes() {
  // search notes
  const [searchNote, setSearchNote] = useState('');
  // Show Notes
  const [notes, setNotes] = useState();
  const history = useHistory(); // use to route dynamically


  useEffect(() => {
    // the function that get all the notes
    getAllNotes().then( setNotes );
    // console.log( notes );
  }, [] )
  

  return (
    <IonApp id='mainContainer'>
      
      {/* header */}
      <IonHeader id='header'>
        {/* back arrow */}
        <Link to='/profile'><IoMdArrowBack id='backIcon' /></Link>

        {/* title */}
        <IonToolbar>  
          <IonTitle id='title'>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div id='content'>

        {/* search */}
        <IonSearchbar className='searchbar' value={searchNote} onIonChange={e => setSearchNote(e.detail.value)}></IonSearchbar>

        {/*  foreach loop */}
        {
          notes ? notes.map((note,i) => (
            <>
              <IonCard key={i} id='noteCards' >

                {/* note title */}
                <h3  onClick={(e) =>{ }} ><Link id='noteTitle' to={'/viewnotes?id=' + note.id }>{note.title}</Link></h3>

                {/* date created */}
                <small id='noteDate'>{note.time}</small>
              </IonCard>
            </>
            )
          ) : (
            <h2>loading </h2>
          )
        }

        {/* add note button */}
        <Link to='./addnote'> <GrAdd id='addNote' /> </Link>

      </div>

    </IonApp>
  );
}

export default Notes;
