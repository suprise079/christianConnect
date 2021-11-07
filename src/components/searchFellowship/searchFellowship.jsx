import { IonButton } from "@ionic/react";
import { IonCard } from "@ionic/react";

// for data management and firebase
import Cookies from "js-cookie";
import Context from "../../context/Context";
import app, { db } from "../../firebase/firebase";

import "./searchFellowship.css";

import { useHistory } from "react-router";

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
      <div className="MapCardResultFellowshipInfo">
        <h3 className="fellowshipName"> {props.name} </h3>
        <div className="subInfo">{props.about ?summary(props.about):""}</div>
        <div className="subInfo">{props.location}</div>
        <div className="subInfo">{props.time ? props.time + " GTM+2" : ""}</div>
      </div>
      <div className="viewInfo">
        <IonButton id="viewinfo-btn" href={"/overviewfs?fsid=" + props.fsid}>
          View
        </IonButton>
      </div>
    </IonCard>
  );
};

export default SearchFellowship;
