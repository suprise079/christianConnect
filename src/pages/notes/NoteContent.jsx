import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonPage, IonContent } from '@ionic/react';
import { GiSaveArrow } from 'react-icons/gi'
import { IoMdArrowBack } from 'react-icons/io'
import './NoteContent.css'

// import firebase tool
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { addNotes } from '../../firebase/firebase-help';
import Cookies from 'js-cookie';
import Context from '../../context/Context';


// get helping functions
import getCurTimeDate from '../../components/helpFunc';



function NoteContent() {
  const { curUser, setCurUser } = useContext( Context );
	const [noteTile, setnoteTile] = useState();
	const [noteContent, setnoteContent] = useState();
	const dateObj = new Date();
	const history = useHistory(); // used to route dynamically.
  const [ user, setUser ] = useState(); // hold current user information

	


	useEffect(() => {
		// set and get current user data from cookie manager
    setCurUser( JSON.parse( Cookies.get("userData") ) );
	}, [])




	const addUserNote = () => {
		if( noteContent && noteTile ) {
			// call sync func and add data to firebase
			addNotes( noteContent, noteTile, user.userId ).then( feedback => { // when adding is done running, do this.
				// if no error
				if( feedback.id ) {
					alert("NOTES SAVE");
					setnoteContent("")
					setnoteTile("");
					history.push("/notes");
				}
				// when something was wrong.. there was an error.
				else { alert("ERROR:PROBLEM"); console.log( feedback ) }
			})
		}
		// when some fields are empty
		else { alert("Some Fields Are Empty"); }
	}



	return (
		<IonPage id='bg'>
			{/* header */}
			<IonHeader id='header'>

			<Link to='./Notes'> <IoMdArrowBack id='backIcon' /> </Link>
				<IonToolbar>
					<IonTitle id='title'>New Notes</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent >
				<div className='note'>

					{/* { noteTile } | { noteContent } */}

					<div id="notTitle" >
						<label >Type title here</label>
						<input
							autoFocus
							value={ noteTile }
							placeholder="note title"
							onChange={ e=> setnoteTile( e.target.value ) }
							type="text" />
					</div>

					<div id="noteContent" >
						<textarea
							value={ noteContent }
							onChange={ e => setnoteContent( e.target.value ) }
							placeholder="type notes" >
							
						</textarea>
					</div>

					{/* <span id='noteText'>Content here</span> */}

					<button id="saveNoteBtn" onClick={ e => addUserNote() } >
						Save Note <i class="bi bi-save"></i>
						{/* <GiSaveArrow className='deleteIcon'/> */}
					</button>

						
				</div>
			</IonContent>
			
		</IonPage>
	)
}

export default NoteContent;