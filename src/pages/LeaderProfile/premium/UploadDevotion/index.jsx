import {
  IonInput,
  IonPage,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonTextarea,
  IonLabel,
} from "@ionic/react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import "../../LeaderProfile.css";
import { doc, setDoc } from "@firebase/firestore";
import {db} from '../../../../firebase/firebase'
import { useHistory } from "react-router";
import { MdAddCircle } from 'react-icons/md'


const UploadDevotions = () => {
  const [date, setdate] = useState("Date");
  const [text, setText] = useState("");
  const fellowshipId = ''
  const [picName, setPicName] = useState('')
  const [formData, setFormData] = useState({
    fellowshipId:fellowshipId, 
    image:'',
    message:'No details provided',
    title:"No title provided"
  })
  const history = useHistory()

  
  function handleChange(e){
     // temporal data variable
     var carryData = formData
     carryData[e.target.name] = e.target.value
     setFormData(carryData)
     console.log('form data: ',formData)
  }

  function getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }

  function handleUpload(event){
    var video = event.target.files[0]
    setPicName({name:video.name, file: URL.createObjectURL(video)})
    console.log(video)
    var carryData = formData
    carryData['image'] = video.file
    setFormData(carryData)
    console.log('form data: ',formData)
  }

  function onImageChange(event){
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setPicName(img.name)
      var carryData = formData
      carryData['image'] = "image.png"
      // console.log("converted image:", getDataUrl(img))
      setFormData(carryData)
      console.log('form data: ',formData)
    }
  };


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

  const handleSubmit = async(e) => {
    e.preventDefault();

    var id = makeid(20)

    const postData = await setDoc(doc(db, "devotion", id), formData)
    .then((response) => {
        alert("Post successfull")
        history.push("/premium")
    })
    .catch((err) => {
        console.log("Err escaped")
        alert("err occured:", err)
    })
  };

  return (
    <IonPage
      style={{
        position: " relative",
        height: "100%",
        background: " linear-gradient(180deg, #FFFFFF 18.75%, #A4D6BF 100%)",
        justifyContent: "flex-start",
        overflowY:"scroll"
      }}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar
          style={{
            background: "transparent",
          }}
        >
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Upload daily devotion</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Body stsarts here */}
      <div id="UploadAnnouncements">
        <form
          action="/"
          /* method="post" */ onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="title">
            <label htmlFor="Title">Massage title</label>
            <IonInput
              required
              type="text"
              name="title"
              clearinput
              className="inputField"
              onInput = {(e) => handleChange(e)}
            ></IonInput>
          </div>
          <div className="datePicker">
            <span className="date">{date}</span>
            <span className="icon">
              <FaCalendarAlt size="25px" />
            </span>
            <input
              value={date}
              onChange={(e) => {
                console.log(e.target.value)
                var parts = e.target.value.split("-");
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                setdate(mydate.toDateString());
                handleChange(e)
              }}
              required
              name='time'
              type="date"
              clearinput
              className="inputField"
              placeholder=" "
            ></input>
          </div>
          <IonTextarea
            required
            minlength='50'
            min='50'
            rows="7"
            placeholder="Type or paste massage here"
            className="textArea"
            value={text}
            name='text'
            onIonChange={(e) =>  handleChange(e)}
          ></IonTextarea>

          <div className="addYt">
            <span className="text">Upload devotion picture</span>
            <span className="add">
              <input type="file" accept="image/*" required onChange={(e) => onImageChange(e)} />
              <MdAddCircle color="white" size="25px" />
            </span>
          </div>
          <div className="youtubeLink">{picName.name}</div>

          <button type="submit"><span>Post</span> <IoMdCloudUpload size="20px"/></button>
        </form>
      </div>
    </IonPage>
  );
};

export default UploadDevotions;






















/* Using with useIonPicker Hook */

// const PickerExample: React.FC = () => {
//   const [present] = useIonPicker();
//   const [value, setValue] = useState('');
//   return (
//     <IonPage>
//       <IonContent>
//         <IonButton
//           expand="block"
//           onClick={() =>
//             present({
//               buttons: [
//                 {
//                   text: 'Confirm',
//                   handler: (selected) => {
//                     setValue(selected.animal.value)
//                   },
//                 },
//               ],
//               columns: [
//                 {
//                   name: 'animal',
//                   options: [
//                     { text: 'Dog', value: 'dog' },
//                     { text: 'Cat', value: 'cat' },
//                     { text: 'Bird', value: 'bird' },
//                   ],
//                 },
//               ],
//             })
//           }
//         >
//           Show Picker
//         </IonButton>
//         <IonButton
//           expand="block"
//           onClick={() =>
//             present(
//               [
//                 {
//                   name: 'animal',
//                   options: [
//                     { text: 'Dog', value: 'dog' },
//                     { text: 'Cat', value: 'cat' },
//                     { text: 'Bird', value: 'bird' },
//                   ],
//                 },
//                 {
//                   name: 'vehicle',
//                   options: [
//                     { text: 'Car', value: 'car' },
//                     { text: 'Truck', value: 'truck' },
//                     { text: 'Bike', value: 'bike' },
//                   ],
//                 },
//               ],
//               [
//                 {
//                   text: 'Confirm',
//                   handler: (selected) => {
//                     setValue(`${selected.animal.value}, ${selected.vehicle.value}`)
//                   },
//                 },
//               ]
//             )
//           }
//         >
//           Show Picker using params
//         </IonButton>
//         {value && (
//           <div>Selected Value: {value}</div>
//         )}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default PickerExample;