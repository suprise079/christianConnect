import { useState } from "react";
import { Link } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonCard, IonSearchbar, IonApp } from '@ionic/react';
import { IoMdArrowBack } from 'react-icons/io'
import { GrAdd } from 'react-icons/gr'
import "./Notes.css";
import NotesInfo from './notes.json'
// import NoteContent from "./NoteContent";

function Notes() {

  // search notes
  const [searchNote, setSearchNote] = useState('');

  // Show Notes
  const [notes, setNotes] = useState(NotesInfo);

  // // Display Notes
  // function Notes(){
    
  return (
    <IonApp id='mainContainer'>
      

      {/* header */}
      <IonHeader id='header'>
        {/* back arrow */}
        <IoMdArrowBack id='backIcon' />
        {/* title */}
        <IonToolbar>  
          <IonTitle id='title'>Notes</IonTitle>
        </IonToolbar>

      </IonHeader>

      <div id='content'>

        {/* search */}
        <IonSearchbar className='searchbar' value={searchNote} onIonChange={e => setSearchNote(e.detail.value!)}></IonSearchbar>

        {/*  foreach loop */}
        {
          notes.map((note,i) => {
            return (
              <>
                <IonCard key={i} id='noteCards' >

                  {/* note title */}
                  <h3  onClick={(e) =>{ }} ><Link id='noteTitle' to={'/viewnotes?id=' + i }>{note.title}</Link></h3>

                  {/* date created */}
                  <small id='noteDate'>{note.date}</small>

                </IonCard>

              </>
            )
          })
        }

        {/* add note button */}
        <Link to='./NoteContent'> <GrAdd id='addNote' /> </Link>

      </div>

    </IonApp>
  );
}

export default Notes;
