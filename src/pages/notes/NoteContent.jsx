import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonPage, IonContent } from '@ionic/react';
import { GiSaveArrow } from 'react-icons/gi'
import { IoMdArrowBack } from 'react-icons/io'
import './NoteContent.css'

// import firebase tool
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { addNotes } from '../../firebase/firebase-help';


// get helping functions
import getCurTimeDate from '../../components/helpFunc';



function NoteContent() {

	const [noteTile, setnoteTile] = useState();
	const [noteContent, setnoteContent] = useState();
	const dateObj = new Date();
	const history = useHistory(); // used to route dynamically.
  const [ user, setUser ] = useState(); // hold current user information

	


	useEffect(() => {


		// get the value of auth.current user that keeps user's data.
    var d = auth.currentUser?.providerData[0].displayName;
    // console.log( JSON.parse( d ) ); // for debuggin purposes
    setUser( JSON.parse( d ) ) // set user for this page
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

					<GiSaveArrow
						onClick={ e => addUserNote()  }
						className='deleteIcon'/>
						
				</div>
			</IonContent>
			
		</IonPage>
	)
}

export default NoteContent;