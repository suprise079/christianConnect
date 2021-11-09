import { IonIcon, IonLabel } from "@ionic/react";
import { mail, person } from "ionicons/icons";
import { FaHome } from "react-icons/fa";
import { useHistory } from "react-router";

import "./tabBar.css"; // import css

const TabBar = ({ active, slideTo }) => {

  const history = useHistory()
  return (
    <div className="tabBarContainer">
      <div
        style={{ color: active === 0 ? "white" : "black" }}
        onClick={() => slideTo(0); }
      >
        <i>
          {" "}
          <FaHome color={active === 0 ? "white" : "black"} />
        </i>
        <IonLabel className="label"> Home </IonLabel>
      </div>

      <div
        style={{ color: active === 1 ? "white" : "black" }}
        onClick={() => slideTo(1)}
      >
        <i>
          {" "}
          <IonIcon
            icon={mail}
            color={active === 1 ? "white" : "black"}
          ></IonIcon>{" "}
        </i>
        <IonLabel className="label"> Subscription </IonLabel>
      </div>

      <div
        style={{ color: active === 2 ? "white" : "black" }}
        onClick={() => slideTo(2)}
      >
        <i>
          {" "}
          <IonIcon
            icon={person}
            color={active === 2 ? "white" : "black"}
          ></IonIcon>{" "}
        </i>
        <IonLabel className="label"> Profile </IonLabel>
      </div>
    </div>
  );
};

export default TabBar;
