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


const UploadAnnouncement = () => {
  const [date, setdate] = useState("Date");
  const [text, setText] = useState("");
  const fellowshipId = ''
  const [formData, setFormData] = useState({
    fellowshipId:fellowshipId, 
    picture:'',
    time: new Date(),
    text:'No details provided',
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

    const postData = await setDoc(doc(db, "announcements", id), formData)
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
          <IonTitle>Upload announcements</IonTitle>
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
            rows="7"
            placeholder="Description..."
            className="textArea"
            value={text}
            name='text'
            onIonChange={(e) =>  handleChange(e)}
          ></IonTextarea>

          <button type="submit"><span>Post</span> <IoMdCloudUpload size="20px"/></button>
        </form>
      </div>
    </IonPage>
  );
};

export default UploadAnnouncement;
