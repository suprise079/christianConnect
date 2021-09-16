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
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import "../styles.css";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target);
};
const UploadAnnouncement = () => {
  const [date, setdate] = useState("Date");
  const [text, setText] = useState("");
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
              name="Title"
              clearInput="true"
              className="inputField"
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
              }}
              
              type="date"
              clearInput="true"
              className="inputField"
              placeholder=" "
            ></input>
          </div>
          <IonTextarea
            rows="7"
            placeholder="Description..."
            className="textArea"
            value={text}
            onIonChange={(e) => setText(e.target.value)}
          ></IonTextarea>

          <button type="submit"><span>Post</span> <IoMdCloudUpload size="20px"/></button>
        </form>
      </div>
    </IonPage>
  );
};

export default UploadAnnouncement;
