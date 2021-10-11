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
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { RiVideoUploadFill } from "react-icons/ri";
import "../styles.css";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target);
};
const UploadSermon = () => {
  const [addYt, setaddYt] = useState(false);
  const [text, setText] = useState(""); /* This is the sermon in text format */
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
              name="Title"
              clearInput="true"
              className="inputField"
            ></IonInput>
          </div>
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

          <IonTextarea
            rows="7"
            placeholder="Type or paste a sermon..."
            className="textArea"
            value={text}
            onIonChange={(e) => setText(e.target.value)}
          ></IonTextarea>
          <div className="addYt">
            <span className="text">Add a youtube link</span>
            <span className="add" onClick={()=>{setaddYt(!addYt)}}>
              <MdAddCircle color="white" size="25px" />
            </span>
          </div>
          {addYt ? (
            <div className="youtubeLink">
              <IonInput
                required
                type="text"
                name="Title"
                clearInput="true"
                placeholder="https://www.youtube.com/sermon123"
                className="inputField ytLink"
              ></IonInput>
            </div>
          ) : (
            ""
          )}
          <button type="submit">
            <span>Upload</span> <RiVideoUploadFill size="20px" />
          </button>
        </form>
      </div>
    </IonPage>
  );
};

export default UploadSermon;
