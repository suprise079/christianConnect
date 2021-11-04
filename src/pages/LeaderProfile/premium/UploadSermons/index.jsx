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
import { MdAddCircle } from "react-icons/md";
import { RiVideoUploadFill } from "react-icons/ri";
import "../../LeaderProfile.css";
import { useHistory } from "react-router";
import { ref, uploadBytes } from "firebase/storage";
import {db, storage} from '../../../../firebase/firebase'
import { getFirestore,
  setDoc,
  doc
} from "firebase/firestore";



const UploadSermon = () => {

  const [addYt, setaddYt] = useState(false);
  const [text, setText] = useState(""); /* This is the sermon in text format */
  const [videoDetails, setVideoDetails] = useState({name:'', file:''})
  const fellowshipId = ''
  const [formData, setFormData] = useState({
    fellowshipId:fellowshipId, 
    video:videoDetails.name,
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


  function handleUpload(event){
    var video = event.target.files[0]
    setVideoDetails({name:video.name, file:video})
    console.log(video)
    var carryData = formData
    carryData['video'] = video.name
    setFormData(carryData)
    console.log('form data: ',formData)
  }

  // make a unique id for the database
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

    const postData = await setDoc(doc(db, "videos", id), formData)
    .then((response) => {
        alert("Post successfull")
        
    })
    

    // upload the video to storage
    let path = 'videos/'+videoDetails.name
    // create video reference
    const storageRef = ref(storage, path);
    // upload file to reference
    await uploadBytes(storageRef, videoDetails.file)
    .then((snapshot) => {
      console.log('Uploaded a video!');
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
          <IonTitle>Upload Sermons</IonTitle>
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
            <label htmlFor="Title">Title</label>
            <IonInput
              required
              type="text"
              name="title"
              clearinput
              className="inputField"
              onInput = {(e) => handleChange(e)}
            ></IonInput>
          </div>
          <div className="addYt">
            <span className="text">Upload Video</span>
            <span className="add">
              <input type="file" accept="video/*" required onChange={(e) => handleUpload(e)} />
              <MdAddCircle color="white" size="25px" />
            </span>
          </div>
            <div className="youtubeLink">{videoDetails.name}</div>
          <button type="submit">
            <span>Upload</span> <RiVideoUploadFill size="20px" />
          </button>
        </form>
      </div>
    </IonPage>
  );
};

export default UploadSermon;




          {/* DATE TIME PICKER ==> POTENTIAL COMPONENT TO BE */}
          {/* <div className="datePicker">
            <span className="date">{date}</span>
            <span className="icon">
              <FaCalendarAlt size="25px" />
            </span>
            <input
              value={date}
              onChange={(e) => {
                var parts = e.target.value.split("-");
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
                console.log(mydate.toDateString());
                setdate(mydate.toDateString());
              }}
              
              type="date"
              clearInput="true"
              className="inputField"
              placeholder=" "
            ></input>
          </div> */}

          {/* <IonTextarea
            rows="7"
            placeholder="Type or paste a sermon..."
            className="textArea"
            value={text}
            onIonChange={(e) => setText(e.target.value)}
          ></IonTextarea> */}