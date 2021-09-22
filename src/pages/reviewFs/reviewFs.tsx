import { IonContent, IonItemDivider, IonTabBar, IonTabButton, IonIcon, IonPage, IonTitle, IonList, IonLabel, IonItem, IonAvatar, IonButton } from '@ionic/react';
import './reviewFs.css';
import { arrowBack, ellipsisHorizontalSharp, star, starHalf, personCircleSharp } from 'ionicons/icons';

import img3 from './prayer.jpeg';

import TopImgFs from '../../components/topImagesFs/topImgFs';

const ReviewFS: React.FC = () => {
  return (
    <IonPage className="page" >


      <IonTabBar className="tabbar" >
        <IonTabButton >
          <IonIcon icon={arrowBack} className=" tab1" size="small"></IonIcon>
        </IonTabButton>
        <IonTabButton>
          <IonIcon icon={ellipsisHorizontalSharp} className="tab" size="small"></IonIcon>
        </IonTabButton>
      </IonTabBar>




      <IonContent>


        <TopImgFs />

        <IonTitle>Mpumelelo Prayer Meeting</IonTitle>

        <p>4.2<IonIcon icon={star} className="icon1" ></IonIcon>
        <IonIcon icon={star} className="icon1" ></IonIcon>
        <IonIcon icon={star} className="icon1" ></IonIcon>
        <IonIcon icon={star} className="icon1"></IonIcon>
        <IonIcon icon={starHalf} className="icon1" ></IonIcon>(34)</p>
        

        <IonItem  className = "item" color = " #348D63" lines = "full">
          <IonLabel>
            <IonLabel><small>Rate and review</small></IonLabel> 
            <IonLabel><small>Share your experience to help others</small></IonLabel>
            <IonIcon icon={personCircleSharp} className="person"></IonIcon> 
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
          </IonLabel>
        </IonItem>


        <IonItem  color = " #348D63" lines = "full">
          <IonLabel>
            <IonLabel><small>Sort By</small>
            <IonButton className=" btn " size="small">Newest</IonButton>
            <IonButton className="btn" size="small"  >Highest</IonButton>
            <IonButton className="btn" size="small" >Lowest</IonButton> </IonLabel>
            
            <div slot=" start" className="avatar">
              <img src={img3} />
              <p > <i > {"Marie Hope"} </i>  <i> {"2"} reviews </i> </p>
            </div>
          
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1"></IonIcon>
            <IonIcon icon={star} className="star"></IonIcon>
            <IonLabel > <small>2 months ago</small></IonLabel>
            <IonLabel><small>I love this app, it has brought me close to God</small></IonLabel>
          </IonLabel>
        </IonItem>


      </IonContent>
    </IonPage>
  );
};

export default ReviewFS;