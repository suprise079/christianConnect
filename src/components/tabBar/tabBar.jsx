import { IonIcon, IonLabel } from "@ionic/react";
import { mail, person } from "ionicons/icons";
import { FaHome } from "react-icons/fa";

import "./tabBar.css"; // import css

const TabBar = ({ active, slideTo }) => {
  return (
    <div className="tabBarContainer">
      <div
        style={{ color: active == 0 ? "white" : "" }}
        onClick={() => slideTo(0)}
      >
        <i>
          {" "}
          <FaHome color={active == 0 ? "white" : ""} />
        </i>
        <IonLabel className="label"> Home </IonLabel>
      </div>

      <div
        style={{ color: active == 1 ? "white" : "" }}
        onClick={() => slideTo(1)}
      >
        <i>
          {" "}
          <IonIcon
            icon={mail}
            color={active == 1 ? "white" : ""}
          ></IonIcon>{" "}
        </i>
        <IonLabel className="label"> Subscription </IonLabel>
      </div>

      <div
        style={{ color: active == 2 ? "white" : "" }}
        onClick={() => slideTo(2)}
      >
        <i>
          {" "}
          <IonIcon
            icon={person}
            color={active == 2 ? "white" : ""}
          ></IonIcon>{" "}
        </i>
        <IonLabel className="label"> Profile </IonLabel>
      </div>
    </div>
  );
};

export default TabBar;
