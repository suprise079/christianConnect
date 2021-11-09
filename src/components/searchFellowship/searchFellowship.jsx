import { IonButton, IonCardContent, IonCardHeader } from "@ionic/react";
import { IonCard } from "@ionic/react";

// for data management and firebase
import Cookies from "js-cookie";
import Context from "../../context/Context";
import app, { db } from "../../firebase/firebase";

import "./searchFellowship.css";

import { useHistory } from "react-router";
import { GrMapLocation } from "react-icons/gr";
import { BiTime } from "react-icons/bi";

const SearchFellowship = (props) => {
  const history = useHistory();

  function summary(t) {
    if (t) return <em>"{t.split(" ").splice(0, 5).join(" ") + " ..."}"</em>;
  }

  return (
    <IonCard
      onClick={() => {
        history.push("/overviewfs?fsid=" + props.fsid);
      }}
      className="MapCardResultFellowship"
    >
      <IonCardHeader color="dark">
        <h3 style={{ textAlign: "left" }} className="fellowshipName">
          {props.name}
        </h3>
      </IonCardHeader>
      <IonCardContent>
        <div className="subInfo">
          <GrMapLocation />
          <span>{props.location ? props.location : "-"}</span>
        </div>
        <div className="subInfo">
          <BiTime />
          {props.time.length > 0 ? props.time + " GTM+2" : "--:--"}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default SearchFellowship;
