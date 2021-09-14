import { IonContent, IonHeader, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPage,IonList, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonVirtualScroll } from '@ionic/react';
import Annoce from './annocements';
import Devotions from './devotions';
import { useState } from 'react';
// import { IonHeader, IonToolbar, IonIcon,IonTitle } from "@ionic/react";
import { Link } from "react-router-dom";
import { arrowBackSharp } from "ionicons/icons";
import './subscription.css'
import { MdKeyboardArrowLeft } from 'react-icons/md'


const SubscriptionTabs: React.FC = () => {

  const loop = [1,2,3,4, 5, 6];
  const [page, setpage] = useState('1')

  function switchTab (id:string) {
    document.getElementById(page)!.style.backgroundColor = 'transparent'
    setpage(id) 
    document.getElementById(id)!.style.backgroundColor = 'white'

  }

  return (
    <IonPage id='subscribePage'>
       
        <div>
          <IonButton fill='clear' style={{color:'black', fontSize:'8pt'}} > 
            <MdKeyboardArrowLeft size='20' />
            Back
            </IonButton >
          <IonTitle id='mainHeading'>Mpumelelo fellowship</IonTitle>
        </div>
        
        <div id="tabs" >
          <IonButton fill='clear'id='1' onClick={() => switchTab('1')} className='tabBtn'>Annoucements</IonButton>
          <IonButton fill='clear' id='2' onClick={() => switchTab('2')}  className='tabBtn'>Devotions</IonButton>
          <IonButton fill='clear' id='3' onClick={() => switchTab('3')} className='tabBtn'>Discussions</IonButton>
        </div>
        {/* <IonContent className='tabInfo' style={{backgroundColor:'inherit'}} > */}
          <div className="tabInfoDiv">
            {page == '1' && <Annoce />}
            {page == '2' && <Devotions />}
          </div>
          
        {/* </IonContent> */}
        
    </IonPage>
  );
};

export default SubscriptionTabs;
