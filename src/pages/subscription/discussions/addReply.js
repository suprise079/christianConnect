import { doc, setDoc } from '@firebase/firestore';
import { useState } from 'react';
import { firestoreObj } from '../../../firebase/firebase';
import pic from './men_event.jpg'
import { IonButton } from '@ionic/react';



const AddReply = ({discussionId}) => {

    // currently selected fellowship
    const fellowshipId = 'FO'
    // currently logged user will provided the following data
    const firstName = 'Tadaa';
    const lastName = "ngoveni"
    const picture = pic
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