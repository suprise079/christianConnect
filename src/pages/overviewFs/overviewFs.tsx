import { IonContent,IonIcon, IonItem,IonButton,IonSelect,IonTabButton,IonLabel,IonPage, IonTitle, IonTabBar  } from '@ionic/react';
import './overviewFs.css';
import {
  shareSocialOutline, arrowBack,ellipsisHorizontalSharp,personCircleSharp,star,starHalf,returnUpForward,call,bookmarkSharp,locationSharp,timeSharp,earthSharp
} from 'ionicons/icons'

import { FaArrowLeft, FaEllipsisH } from 'react-icons/fa';

import img1 from './images/Church.jpeg';
import img2 from './images/Church2.jpeg';
import img3 from './images/prayer.jpeg';
 

// import component
import NavigateFs from '../../components/navigateFs/nagivateFs';
import TopImgFs from '../../components/topImagesFs/topImgFs';

const OverviewFs: React.FC = () => {
  return (
    <IonPage className = "overviewFS">
 
      <IonContent fullscreen >

        <div className="tabbar" >
          {/* <button > */}
            <FaArrowLeft />
          {/* </button> */}

          {/* <button> */}
            <FaEllipsisH />
          {/* </button> */}
        </div>

        
        <TopImgFs img1={ img1 } img2={ img2 } img3={ img3 } />

            
        <div className = "container">
          <IonTitle>Mpumelelo Prayer Meeting</IonTitle>

          <p>
            <i >{"4.2"}</i> <IonIcon icon={ star } className = "icon1" ></IonIcon>
            <IonIcon icon={ star } className = "icon1" ></IonIcon>
            <IonIcon icon={ star }className = "icon1" ></IonIcon>
            <IonIcon icon={ star } className = "icon1"></IonIcon>
            <IonIcon icon={ starHalf }className = "icon1" ></IonIcon> <i> ({"34" }) </i>
          </p>
        </div>


        <NavigateFs />

        
        <div className="buttons" >
          <IonIcon icon={returnUpForward}></IonIcon>

          <IonIcon icon={call}></IonIcon>

          <IonIcon icon = {bookmarkSharp}></IonIcon>

          <IonIcon icon = {shareSocialOutline}></IonIcon>
        </div>
        
      

        <div className="locaWebTime"  >
          <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
            <IonIcon icon ={locationSharp} className = "icon"></IonIcon>
            <IonLabel ><small>{"Landau, Terrace rd"} </small></IonLabel><br></br>
          </IonItem>
              
          <IonItem  color = " #348D63" lines="none" className="itemBorderTop time" >
            <IonIcon icon ={timeSharp} className = "icon"></IonIcon>
            <small> Today {"12:00pm"} </small>

            <div>
              <small>Schedule</small>
              <IonSelect className = "selector" ></IonSelect>
            </div>
          </IonItem>
            
            
          <IonItem  color = " #348D63" lines="none" className="itemBorderTop" >
            <IonIcon icon= {earthSharp} className = "icon"></IonIcon>
            <IonLabel ><small> {"www.cnxjnsdn.co.za"} </small></IonLabel>
          </IonItem>
        </div>
          

      </IonContent>
    </IonPage>
  );
};

export default OverviewFs;