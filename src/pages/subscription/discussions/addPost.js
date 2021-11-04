import { IonToolbar, IonTextarea, IonButton } from "@ionic/react";
import {CgCloseR} from 'react-icons/cg'
import {IoCamera, IoVideocam, IoImage, IoDocument, IoArrowBack} from 'react-icons/io5'
import './post.css'
import fearless from '../fearless.jpg';
import { useEffect, useState } from "react";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import { firestoreObj } from "../../../firebase/firebase";
import firebase from "firebase/compat";
import { Firestore } from "@firebase/firestore";


const Post = ({setPage}) => {

    const firstName = "Teagan"
    const lastName = "Tshikuvhe"
    const [userText,setUserText] = useState('')
    const picture = ""
    const [video,setVideo] = useState("")
    const fellowshipId = "F0"
    const userId = "9KJyDFLkBIfqJI7xgn4PR6TwO982"

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    function Save(){
        const send = async() =>{
            
            var id = makeid(20)
            var data = {
                firstName:firstName,
                lastName:lastName,
                date: new Date(),
                fellowshipId: fellowshipId,
                id: id,
                picture: picture,
                text: userText,
                userId: userId,
                video:video
            }
            const postData = await setDoc(doc(firestoreObj, "discussion", id), data)
            .then((response) => {
                alert("Post successfull")
                setPage('3')
            })
            .catch((err) => {
                console.log("Err escaped")
                alert("err occured:", err)
            })
        }
        send()
    }
    
    

    return (
        <div className='commentForm'>
        
        <form action="" >

            <div className="heading">
                <IoArrowBack size='25' />
                <button onClick={Save}>Post</button>
            </div>

            <div className='profile'>
                <img src={fearless} alt="" />
                <div>
                    <p>Suprise ngoveni</p><br />
                    {/* <select name="category" id="">
                        <option value="">catergory</option>
                        <option value="Relationhip">Relationships</option>
                        <option value="identity">Identity in Christ</option>
                        <option value="spitual">Spiritual Warfare</option>
                    </select> */}
                </div>
            </div>

            <div className="textarea">
                <IonTextarea value={userText} onInput={(e) => setUserText(e.target.value)} placeholder="What do you want to talk about?" ></IonTextarea>
                <div className="addedPhotos"></div>
                <div className='media'>
                    <div className="addMedia">
                        <button><IoCamera size='25' className='m-1' /></button>
                        <button><IoVideocam size='25' className='m-1' /></button>
                        <button><IoImage size='25' className='m-1' /></button>
                    </div>
                    <IonButton onClick={Save}>Post</IonButton>
                    
                </div>
            </div>

        </form>
        </div>
    );

}

export default Post;