import {IonButton, IonLabel, IonItem, IonInput} from '@ionic/react'
import { RiCloseLine } from 'react-icons/ri'
import {IoChevronBack} from 'react-icons/io5'
import {FiMoreVertical} from 'react-icons/fi'
import './viewVideo.css'
import vid from '../dummy.mp4'

import React from 'react'

const ViewVideo = () => {

    const note= {title:'Mans thing', content:'this is amaing'}
    
    

    function closeHover(){
        document.getElementById('btn').style.display = 'none';
        console.log('me here')
    }

    const handleChange = (event) => {
        var name = event.target.name;
        note[name] = event.target.value
        console.log(note)
    }

    return (
        <div>
            <div className="close">
                <button id='btn'><IoChevronBack size='20' /></button>
                <span>Video player</span>
                <button><FiMoreVertical size='20' /></button>
            </div>
            <div className="video" >
                <video  controls={true} onClick={() => closeHover()} src={vid}> video cant play</video>

            </div>
            <h3 className="selectedTitle">Notes</h3>
            <div className="playNote">
                <button>Notes</button>
                <button>Playlist</button>
            </div>
            <div className="notes">
                <IonItem>
                    <IonLabel>Title</IonLabel>
                    <IonInput type="text" placeholder='Notes title' name='title' onChange={(e) => handleChange(e)} />
                </IonItem>
                
                <textarea name="" id="" onChange={(e) => handleChange(e)} placeholder='Write notes here...'></textarea>
                <IonButton>Save</IonButton>
            </div>
        </div>
    )
}


export default ViewVideo;