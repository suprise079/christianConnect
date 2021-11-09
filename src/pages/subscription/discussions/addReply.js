import { doc, setDoc } from '@firebase/firestore';
import { useState } from 'react';
import { firestoreObj } from '../../../firebase/firebase';
import pic from './men_event.jpg'
import { IonButton } from '@ionic/react';
import React from "react";
import Session from '../../../components/session';
import { useParams } from 'react-router';




const AddReply = ({discussionId}) => {
    // currently logged user will provided the following data
    const firstName = Session.getFirstName();
    const lastName = Session.getLastName()
    const picture = Session.getPhoto()
    // user entered text
    const [text, setText] = useState("")

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
            var data = {
                firstName:firstName,
                lastName:lastName,
                userPic: picture,
                discussionId: discussionId,
                date: new Date(),
                text: text,
            }
            const postData = await setDoc(doc(firestoreObj, "replys", makeid(20)), data)
            .then((response) => {
                alert("succes full reply")
                // put a code to hide the add reply field
            })
            .catch((err) => {
                alert("err occured:", err)
            })
        }
        send()
    }
  
      return (
        <div>
            <hr />
            <textarea 
            id='addComment' 
            placeholder='Type reply...'
            onChange={(e) => setText(e.target.value)}
            ></textarea>
            <IonButton color='success' onClick={Save}>Post</IonButton>
        </div>
      );
}

export default AddReply;