import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonApp, IonContent } from '@ionic/react';
import { GiSaveArrow } from 'react-icons/gi'
import { IoMdArrowBack } from 'react-icons/io'
import './NoteContent.css'

// import firebase tool
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';





function NoteContent() {
	const [noteTile, setnoteTile] = useState();
	const [noteContent, setnoteContent] = useState();
	const dateObj = new Date();
	const history = useHistory(); // used to route dynamically.
	
	
	// this returns the time, in the format
	// date, month, year, hours:minutes 
	function getTime() {
		return dateObj.getDate() +" "+ 
		dateObj.getMonth() +" "+ 
		dateObj.getFullYear() +" "+
		dateObj.getHours() + ":" +
		dateObj.getMinutes()
	}



	async function add() {

		try {
			const ref = await addDoc( collection(db, "notes"), {
				content: noteContent,
				time: getTime(),
				title: noteTile,
				userId: ""
			})
			return ref;	
		}
		catch( e ) { // if there is an error
			console.log( e );
			return null; // return null
		}	
	} 

	const addUserNote = () => {
		if( noteContent && noteTile ) {
			// call sync func and add data to firebase
			add().then( feedback => { // when adding is done running, do this.
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
		<IonApp id='bg'>
			{/* header */}
			<IonHeader id='header'>

			<Link to='./Notes'> <IoMdArrowBack id='backIcon' /> </Link>
				<IonToolbar>
					<IonTitle id='title'>New Notes</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent >
				<div className='note'>

					{ noteTile } | { noteContent }

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

					<GiSaveArrow
						onClick={ e => addUserNote()  }
						className='deleteIcon'/>
						
				</div>
			</IonContent>
			
		</IonApp>
	)
}

export default NoteContent;