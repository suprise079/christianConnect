import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonApp, IonContent } from '@ionic/react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import './ViewNote.css';
import NotesInfo from './notes.json';


// GET FIREBASE HELPING FUNCTIONS
// import { getOneNote } from '../../firebase/firebase';
import { getAllNotes } from '../../firebase/firebase';




// interface notedt  {
//     "title": string,
//     "date": string,
//     "content": string,
//     "id": number
// }

function ViewNote() {
    // const [idn, setId] = useState<any>();
    // const id: any = 
    // ? parseInt(param.get("id"),10): null;

    // Show Notes
    const [note, setNote] = useState();
    
    useEffect(() => {
        // alert( "sljdfskljdfkg")
        const qs = window.location.search;
        const param =  new URLSearchParams( qs );
        let idnn = param.get("id");
        // console.log( idnn );

        // get all the notes and return em
        getAllNotes().then( data => {
            // if note is the one passed in the link.
            setNote( data.filter( n => n.id === idnn ) )
        })

        // getOneNote();
    }, [])
    

    return (

        <IonApp id='bg'>
        {/* header */}
        <IonHeader id='header'>

        <Link to='./Notes'><IoMdArrowBack id='backIcon' /></Link>

            <IonToolbar>
                <IonTitle id='title'>
                    Note
                </IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent > 
            <div className='note'>
                <h3>
                    { note ? note[0].title : '' }
                </h3>
                <span id='noteText'>{ note ? note[0].content : '' }</span>
                {/* COMMENT OUT LATER....... */}
                {/* <AiFillDelete className='deleteIcon'/> */}
            </div>
        </IonContent>
        </IonApp>
    )
}

export default ViewNote;
