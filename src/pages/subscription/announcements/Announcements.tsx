import { IonContent, IonHeader, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPage,IonList, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, getPlatforms } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useState } from 'react';
import './Announcements.css';
import {Calendar} from '@ionic-native/calendar';


const Annoce: React.FC = () => {

    const loop = [1,2,3,4, 5,6];
    const [selectedId, setSelectedId] = useState(null)
    const annocements = [
      {title:'Gents night', content:'Rev SC & PA Mathebula invites all Men to the first Gents Night on the year under the theme, GENTS let’s talk, unpacking it all.', date:'21 May 2021 18:30', id:1},
      {title:'Mens conference', content:'Rev SC & PA Mathebula invites all Men to the first Gents Night on the year under the theme, GENTS let’s talk, unpacking it all.', date:'21 May 2021 18:30', id:2},
      {title:'Teens camp', content:'Rev SC & PA Mathebula invites all Men to the first Gents Night on the year under the theme, GENTS let’s talk, unpacking it all.', date:'21 May 2021 18:30', id:3},
      {title:'Prayer night', content:'Rev SC & PA Mathebula invites all Men to the first Gents Night on the year under the theme, GENTS let’s talk, unpacking it all.', date:'21 May 2021 18:30', id:4},
      {title:'Youth feast', content:'Rev SC & PA Mathebula invites all Men to the first Gents Night on the year under the theme, GENTS let’s talk, unpacking it all.', date:'21 May 2021 18:30', id:5},
      {title:'Worship night', content:'Rev SC & PA Mathebula invites all Men to the first Gents Night on the year under the theme, GENTS let’s talk, unpacking it all.', date:'21 May 2021 18:30', id:6}
    ]
    function readMore(event:any, cardId:string, contentId:string) {
      setReminder()
        var card = document.getElementById(cardId)!
        var content = document.getElementById(contentId)!
        var button = event.target
        

        if (button.innerHTML == 'More Info'){
          card.style.transform = 'scale(1.05)';
          content.style.height = 'fit-content'
          button.innerHTML = 'Done';
        }
        else{
          card.style.transform = 'scale(1)';
          content.style.transition = 'height 5s'
          content.style.height = '5em'
          button.innerHTML = 'More Info';
        }
    }

    console.log(Calendar.requestReadWritePermission())
    function setReminder(){
      Calendar.hasReadWritePermission().then((data) => {
        console.log(data)
      })
      .catch((err) =>{
        console.log(err)
      })
    }



    return (
        <>
        
            <IonList id="listAnnocement">
            {annocements.map((annocemnet) => {
              var id = annocemnet.id.toString();
              return(
              <IonCard key={annocemnet.id} id={'card'+id} className='p-2' >
                <IonCardTitle className='text-center m-0 p-0'>{annocemnet.title}</IonCardTitle>
                <IonCardContent className='text-center m-0 p-1 summary' id={'content'+id}>{annocemnet.content}</IonCardContent>
                <div className='timeBtn' >
                  <IonCardSubtitle>{annocemnet.date}</IonCardSubtitle>
                  <IonButton  className='p-1' style={{backgroundColor:'CBF8FF'}} onClick={(e) => {readMore(e,'card'+id,'content'+id)}} >More Info</IonButton>
                </div>
                
              </IonCard>
            
            )})}
          </IonList>
        </>
    )
}

export default Annoce;