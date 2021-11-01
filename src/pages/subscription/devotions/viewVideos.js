import {IonButton, IonLabel, IonItem, IonInput} from '@ionic/react'
import { RiCloseLine } from 'react-icons/ri'
import {IoChevronBack} from 'react-icons/io5'
import {FiMoreVertical} from 'react-icons/fi'
import './viewVideo.css'
import vid from '../dummy.mp4'
import { useState, useContext } from 'react'
import { VideoContext } from "./VideoContext";



// User notes interface
const Notes = () => {

    const note= {title:'Mans thing', content:'this is amaing'}

    const handleChange = (event) => {
        var name = event.target.name;
        note[name] = event.target.value
        console.log(note)
    }

    return(
        <>
            <div className="notes">
                    <input type="text" id='noteTitle' placeholder="Notes title..." name='title' onChange={(e) => handleChange(e)} ></input>
                
                <textarea name="" id="" name='content' onChange={(e) => handleChange(e)} placeholder='Write notes here...'></textarea>
                <IonButton>Save</IonButton>
            </div>
        </>
    )
}

// playlist interface
const Playlist = () => {

    const {videos, playingVideo, setPages, setPlayingVideo} = useContext(VideoContext)

    return (
        <>
            {
                videos.map((video) => {
                    return (
                        <>
                            <div className="trackAlign" onClick={() => setPlayingVideo(video)}>
                                <div className="videoUrl" onClick={() => setPlayingVideo(video)}>
                                    <video src={video.url} controls={false}></video>
                                </div>
                                <div className="videoInfo" onClick={() => setPlayingVideo(video)}>
                                    <b>{video.title}</b>
                                    <p className='p-0 m-0'>{video.author}</p>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}


const ViewVideo = () => {

    const [page, setPage] = useState("Notes")
    const {videos, playingVideo, setPages} = useContext(VideoContext)

    function closeHover(){
        document.getElementById('btn').style.display = 'none';
        console.log('me here')
    }

    function switchTab (id) {
        try{
          // remove background of previously selected menu
          document.getElementById(page).style.backgroundColor = 'transparent'
          setPage(id) 
          document.getElementById(id).style.backgroundColor = 'white'
        }
        catch{
          setPage(id) 
          document.getElementById(id).style.backgroundColor = 'white'
        }
      }

    return (
        <div>
            <div className="close mb-2">
                <button id='btn'><IoChevronBack size='20' />Back</button>
                <span>Video player</span>
                <button><FiMoreVertical size='20' /></button>
            </div>
            <div className="video" >
                <video  controls={true} onClick={() => closeHover()} src={playingVideo.url}> video cant play</video>
                <div>{playingVideo.author} - {playingVideo.title}</div>
            </div>
            <h3 className="selectedTitle">{page}</h3>
            <div className="playNote">
                <button id='Notes' onClick={() => switchTab("Notes")}>Notes</button>
                <button id='Playlist' onClick={() => switchTab("Playlist")}>Playlist</button>
            </div>
            { page == "Notes" && <Notes /> }
            { page == "Playlist" && <Playlist /> }
        </div>
    )
}


export default ViewVideo;