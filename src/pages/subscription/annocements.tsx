import { IonContent, IonHeader, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPage,IonList, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';



const Annoce: React.FC = () => {

    const loop = [1,2,3,4, 5,6];

    return (
        <>
            <IonList id="listAnnocement">
            {loop.map((e) => {
              return(
              <IonCard key={e} className='p-2' >
                <IonCardTitle className='text-center'>Gents night</IonCardTitle>
                <IonCardContent className='text-center'>Rev SC & PA Mathebula invites all Men to the first Gents Night
    on the year under the theme, GENTS let’s talk, unpacking it all.</IonCardContent>
                <IonCardSubtitle style={{width:'fit-content'}}>Friday 21 May 2021 at 18:30.</IonCardSubtitle>
                <IonButton className='float-end'>More Info</IonButton>
              </IonCard>
            
            )})}
          </IonList>
        </>
    )
}

export default Annoce;