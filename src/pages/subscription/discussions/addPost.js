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
import React from "react";
import Session from "../../../components/session";
import { useParams } from "react-router";



const Post = ({setPage}) => {

    const firstName = Session.getFirstName()
    const lastName = Session.getLastName()
    const [userText,setUserText] = useState('')
    const picture = Session.getPhoto()
    const [video,setVideo] = useState("")
    const fellowshipId = useParams()
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
                fellowshipId: fellowshipId.fellowshipId,
                id: id,
                picture: picture,
                text: userText,
                userId: userId,
                video:video,
                userPic:Session.getPhoto()
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
                
            </div>

            <div className='addPostProfile'>
                <img src={Session.getPhoto()} alt="" />
                <div>
                    <span>{Session.getFirstName() +" "+Session.getLastName()}</span><br />
                    <span style={{fontSize:'10pt', color:'grey'}}>{Session.getEmail()}</span>
                </div>
            </div>

            <div className="textarea">
                <IonTextarea value={userText} onInput={(e) => setUserText(e.target.value)} placeholder="What do you want to talk about?" required ></IonTextarea>
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