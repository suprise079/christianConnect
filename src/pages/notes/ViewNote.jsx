import React from 'react';
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonPage, IonContent } from '@ionic/react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import './ViewNote.css';



// GET FIREBASE HELPING FUNCTIONS
// import { getOneNote } from '../../firebase/firebase';
import { deleteDocument, getAllNotes } from '../../firebase/firebase-help';


function ViewNote() {
    const [note, setNote] = useState();
		const history = useHistory(); // use to route dynamically...
    
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
        // getOneNote(); // was not working, decided to get all notes
    }, [])


		const delNote = ( id ) => { // console.log( id );
			let res = window.confirm("Proceed to delete?");

			if( res ) {
				deleteDocument("notes", id).then(() => {
					alert("notes deleted");
					history.push("/notes");
				});
			}
		}
    

    return (
			<IonPage >

			<div id='bg'>
				{/* header */}
				<IonHeader id='header'>
				<Link to='./Notes'><IoMdArrowBack id='backIcon' /></Link>
						<IonToolbar>
								<IonTitle id='title'>
										Note
								</IonTitle>
						</IonToolbar>
				</IonHeader>

				<>
					{
						note ? (
							<div className='note'>
								<h3>
									{ note ? note[0].title : '' }
								</h3>
								<span id='noteText'>{ note ? note[0].content : '' }</span>



								{/* COMMENT OUT LATER....... */}
								<AiFillDelete
									onClick={ e=> delNote( note[0].id ) }
									className='deleteIcon'/>
							</div>
						) : (
							<h2 > Loading... </h2>
						)
					}
					
				</>
			</div>

			</IonPage>

    )
}

export default ViewNote;
