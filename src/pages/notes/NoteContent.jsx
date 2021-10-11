import React from 'react'
import { Link } from 'react-router-dom'
import { IonHeader, IonTitle, IonToolbar, IonApp } from '@ionic/react';
import { GiSaveArrow } from 'react-icons/gi'
import { IoMdArrowBack } from 'react-icons/io'
import './NoteContent.css'

function NoteContent() {
    return (
        <IonApp id='bg'>
            {/* header */}
            <IonHeader id='header'>

            <Link to='./Notes'><IoMdArrowBack id='backIcon' /></Link>

                <IonToolbar>
                    <IonTitle id='title'>New Notes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div className='note'>
                <h3>Type title here</h3>
                <span id='noteText'>Content here</span>
                
                    
                <GiSaveArrow className='deleteIcon'/>
                
            </div>
        </IonApp>
    )
}

export default NoteContent;
