import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { play } from 'ionicons/icons';
import church from './church.jpeg';
import './Tab2.css';


const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>

        <IonHeader>
          <IonToolbar>
            <IonTitle className="headerTitle" size="large">Subscriptions</IonTitle>
          </IonToolbar>
        </IonHeader>

        


      <IonGrid>
          <IonRow>
            <IonCol id='1'><img className='highlightImg' src={church} alt='fellow1' /></IonCol>
            <IonCol id='2'><img className='highlightImg' src={church} alt='fellow2' /></IonCol>
            <IonCol id='3'><img className='highlightImg' src={church} alt='fellow3' /></IonCol>
            <IonCol id='4'><img className='highlightImg' src={church} alt='fellow4' /></IonCol>
            <IonCol id='5' className='viewBtn'>View All<IonIcon icon={play} /> </IonCol>
          </IonRow>
      </IonGrid>
      
      {/* <IonButton color='favorite'>View all</IonButton> */}
     
      
      <div className='ann-container' >
        
        {/* image */}
        <img className='announceImg' src={church} />

        {/* content */}
        <div className='announceContent'>
          <h4>Gents Night</h4>
          <h5>Mpumelelo Prayer Meeting</h5>
          {/* button */}
          <IonButton size='small' color='btn' className='btn'> Set Reminder </IonButton>
        </div>
          
      </div>


      <div className='ann-container' >
        
        {/* image */}
        <img className='announceImg' src={church} />


        {/* content */}
        <div className='announceContent'>
          <h4>Gents Night</h4>
          <h5>Mpumelelo Prayer Meeting</h5>
          {/* button */}
          <IonButton size='small' color='btn' className='btn'> Set Reminder </IonButton>
        </div>
          
      </div>

      <div className='ann-container' >
        
        {/* image */}
        <img className='announceImg' src={church} />

        {/* content */}
        <div className='announceContent'>
          <h4>Gents Night</h4>
          <h5>Mpumelelo Prayer Meeting</h5>
          {/* button */}
          <IonButton size='small' color='btn' className='btn'> Set Reminder </IonButton>
        </div>
          
      </div>

      <div className='ann-container' >
        
        {/* image */}
        <img className='announceImg' src={church} />

        {/* content */}
        <div className='announceContent'>
          <h4>Gents Night</h4>
          <h5>Mpumelelo Prayer Meeting</h5>
          {/* button */}
          <IonButton size='small' color='btn' className='btn'> Set Reminder </IonButton>
        </div>
          
      </div>



      </IonContent>

      

    </IonPage>
  );
};

export default Tab2;



// make a function that add two numbers

