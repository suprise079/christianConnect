import { IonContent, IonHeader, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPage,IonList, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './annocements.css'


const Annoce: React.FC = () => {

    const loop = [1,2,3,4, 5,6];

    return (
        <>
            <IonList id="listAnnocement">
            {loop.map((e) => {
              return(
              <IonCard key={e} className='p-2' >
                <IonCardTitle className='text-center m-0 p-0'>Gents night</IonCardTitle>
                <IonCardContent className='text-center m-0 p-1'>Rev SC & PA Mathebula invites all Men to the first Gents Night
    on the year under the theme, GENTS let’s talk, unpacking it all.</IonCardContent>
                <div className='timeBtn' >
                  <IonCardSubtitle> 21 May 2021 18:30</IonCardSubtitle>
                  <IonButton  className='p-1' style={{backgroundColor:'CBF8FF'}} >More Info</IonButton>
                </div>
                
              </IonCard>
            
            )})}
          </IonList>
        </>
    )
}

export default Annoce;