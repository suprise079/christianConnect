
import { IonContent, IonPage } from "@ionic/react";
import { FaEllipsisH, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import './photosFs.css';

// import component
import NavigateFs from "../../components/navigateFs/nagivateFs";


const FellowshipPhotos: React.FC = () => {



  return (
    <IonPage >

      <IonContent >
      <div className="fellowshipPhotos" >
        <div className="topbar" >
          {/* <IonButton > */} <FaArrowLeft /> {/* </IonButton> */}
          {/* <IonButton > */} <FaEllipsisH /> {/* </IonButton> */}
        </div>

        <NavigateFs />

        <div className="images" >
          <div >
            <p style={{padding: '3em', backgroundColor:"lightgrey"}} > Main Image </p>
          </div>

          <div className="moreImages" >
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((imgs, i ) => (
                <p key={i} 
                style={{ width:"32%", textAlign: "center", padding: '2em',
                backgroundColor:"lightgrey", margin: ".1em" 
              }} > { imgs } </p>
              ))
            }
          </div>
        </div>
      </div>

      </IonContent>
    </IonPage>
  );
}

export default FellowshipPhotos;