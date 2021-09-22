import { IonContent,IonIcon, IonItem,IonButton,IonSelect,IonTabButton,IonLabel,IonPage, IonTitle, IonTabBar,  } from '@ionic/react';
import './overviewFs.css';
import {
  shareSocialOutline, arrowBack,ellipsisHorizontalSharp,personCircleSharp,star,starHalf,returnUpForward,call,bookmarkSharp,locationSharp,timeSharp,earthSharp
} from 'ionicons/icons'

import { FaArrowLeft, FaEllipsisH, FaStar, FaStarHalf, FaStarHalfAlt, FaRegStarHalf } from 'react-icons/fa';

import img1 from './images/Church.jpeg';
import img2 from './images/Church2.jpeg';
import img3 from './images/prayer.jpeg';
 

import { Link } from 'react-router-dom';



// import component
import NavigateFs from '../../components/navigateFs/nagivateFs';
import TopImgFs from '../../components/topImagesFs/topImgFs';

const OverviewFs: React.FC = () => {
  return (
    <IonPage className = "overviewFS">

      {/* <IonTabBar className="tabbar" >
        <IonTabButton > 
          <IonIcon icon={ arrowBack } />
        </IonTabButton>

        <IonTabButton > 
          <IonIcon size="small" icon={ ellipsisHorizontalSharp } />
        </IonTabButton>
      </IonTabBar> */}
        

 
      <IonContent className="overview" fullscreen >

        <div className="tabbarContainer" > 
          <div className="tabbar" slot="fixed" >
            <FaArrowLeft className="iconHover" />
            <FaEllipsisH className="iconHover" />
          </div>
        </div>
        
        
        <div className="imagesO" > 
          <TopImgFs img1={ img1 } img2={ img2 } img3={ img3 } />
        </div>

            
        <div className = "nameFs">
          <p>Mpumelelo Prayer Meeting</p>

          <p>
            <i >{"4.2"}</i> 
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStar className = "icon1" />
            <FaStarHalfAlt className = "icon1" /> 
            <i> ({"34" }) </i>
          </p>
        </div>


        <NavigateFs />

        
        <div className="buttons" >
          <IonIcon icon={returnUpForward}></IonIcon>

          <Link to="" href="tel:0738189349" >
            <IonIcon icon={call}></IonIcon>
          </Link>

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