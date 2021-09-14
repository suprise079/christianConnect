import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { logoClosedCaptioning, play } from 'ionicons/icons';
import church from './church.jpeg';
import hope from './hope.jpg'
import mpumi from './mpumi.jpg'
import './Tab2.css';


const Tab2: React.FC = () => {

  var loop = [1,2,3,4,,5,6]
  return (
    <IonPage>
      <IonContent fullscreen>

        <IonHeader>
          <IonToolbar>
            <IonTitle className="headerTitle" size="large">Subscriptions</IonTitle>
          </IonToolbar>
        </IonHeader>

        


      <IonGrid>
        <div className="scrollSubscriptions">
          {/* show only ten and find the rest in view all */}
          <IonRow>
            <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
            <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
            <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
            <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
            <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
            <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
            <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
            <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
            
          </IonRow>
        </div>
        <button id="viewAll">View All</button>
      </IonGrid>
      
      {/* <IonButton color='favorite'>View all</IonButton> */}
     
      
     {
       loop.map((annoce) => {
        return(
          <div className='ann-container' >
        
            {/* image */}
            <img className='announceImg' src={hope} />

            {/* content */}
            <div className='announceContent'>
              <h4>Gents Night</h4>
              <h6>Mpumelelo Prayer Meeting</h6>
              {/* button */}
              <IonButton size='small' color='btn' className='btn p-1'> Set Reminder </IonButton>
            </div>

          </div>
        )
       })
     }

      </IonContent>

      

    </IonPage>
  );
};

export default Tab2;



// make a function that add two numbers

