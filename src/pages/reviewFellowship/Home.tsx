import { IonContent, IonItemDivider, IonTabBar, IonTabButton, IonIcon, IonPage, IonTitle, IonList, IonLabel, IonItem, IonAvatar, IonButton } from '@ionic/react';
import './Home.css';
import { arrowBack, ellipsisHorizontalSharp, star, starHalf, personCircleSharp } from 'ionicons/icons';
import img1 from './images/Church.jpeg';
import img2 from './images/Church2.jpeg';
import img3 from './images/prayer.jpeg';

const Home: React.FC = () => {
  return (
    <IonPage className="page" >
      <IonTabBar>
        <IonTabButton >
          <IonIcon icon={arrowBack} className=" tab1" size="small"></IonIcon>
        </IonTabButton>
        <IonTabButton>
          <IonIcon icon={ellipsisHorizontalSharp} className="tab" size="small"></IonIcon>
        </IonTabButton>
      </IonTabBar>

      <IonContent>

        
        <img className=" img1" src={img1} />
        <img className=" img2" src={img2} />
        <img className=" img3" src={img3} />
          <IonTitle>Mpumelelo Prayer Meeting</IonTitle>
          <p>4.2<IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1" ></IonIcon>
            <IonIcon icon={star} className="icon1"></IonIcon>
            <IonIcon icon={starHalf} className="icon1" ></IonIcon>(34)</p>
        


        {/* <IonItem lines="full"  > */}
          <IonList lines  = "full" className = "col"  >
            <IonLabel><small>Rate and review</small></IonLabel><br></br>
            <IonLabel  ><small>Share your experience to help others</small></IonLabel><br></br>
            <IonIcon icon={personCircleSharp} className="person"></IonIcon>
            <IonIcon icon={star} className="icon2" ></IonIcon>
            <IonIcon icon={star} className="icon2"  ></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
            <IonIcon icon={star} className="icon2"></IonIcon>
          </IonList>
        {/* </IonItem> */}


        <IonList className = "col">
          <IonLabel><small>Sort By</small></IonLabel>
          <IonButton className=" btn " size="small">Newest</IonButton>
          <IonButton className="btn" size="small"  >Highest</IonButton>
          <IonButton className="btn" size="small" >Lowest</IonButton>


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
          <p >I want to change the font size of a ion-label in the home page of a ionic app.
            have read that I can change the font size variables in the __variables.scss file, which could affect the ion-label. I think I could do that. But I find it strange that it doesn't work to style the ion-label in the scss file associated with the page. I have searched onlin
            but I couldn't find anything about it,
            other than that my approach should work.</p>
        </IonList>
      </IonContent>







    </IonPage>
  );
};

export default Home;
