import { IonContent, IonHeader, IonCard,IonRouterOutlet, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPage,IonList, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonVirtualScroll } from '@ionic/react';
import Annoce from './announcements/Announcements'
import Devotions from './devotions/Devotions.js';
import { useEffect, useState } from 'react';
// import { IonHeader, IonToolbar, IonIcon,IonTitle } from "@ionic/react";
import { arrowBackSharp } from "ionicons/icons";
import './subscriptionTabs.css'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import Discusions from './discussions/Discussions.js'
import { IoAddSharp } from 'react-icons/io5';
import Post from './discussions/addPost'
import { Link } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useParams } from 'react-router';
import { collection, query } from '@firebase/firestore';
import { firestoreObj } from '../../firebase/firebase';

const SubscriptionTabs = () => {

  const loop = [1,2,3,4, 5, 6];
  const [page, setPage] = useState('1')
  const fellowshipId = useParams()
  console.log(fellowshipId,":selected fellowshp")

  // switch between annoucement, devitions and dsicussion tabas 
  function switchTab (id) {
    try{
      // remove background of previously selected menu
      document.getElementById(page).style.backgroundColor = 'transparent'
      console.log("previous: turned off",page)
      setPage(id) 
      document.getElementById(id).style.backgroundColor = 'white'
      console.log("current: turned on",id)
    }
    catch{
      setPage(id) 
      document.getElementById(id).style.backgroundColor = 'white'
      console.log("current: turned on",id)
    }
  }
  
  useEffect(() => {
    {switchTab(page)}

    // get current selected fellowship
    const dbQuery = query(collection(firestoreObj, "fellowships"))
  },[])

  return (
    <IonPage id='subscribePage'>
        <div>
          <IonButton fill='clear' style={{color:'black', fontSize:'8pt'}} > 
            <Link to='/SubscriptionHome'><MdKeyboardArrowLeft size='20' />Back</Link>
            </IonButton >
          <IonTitle id='mainHeading'>{}</IonTitle>
        </div>
        
        <div id="tabs" >
          <IonButton fill='clear' id='1' onClick={() => switchTab('1')} className='tabBtn'>Annoucements</IonButton>
          <IonButton fill='clear' id='2' onClick={() => switchTab('2')}  className='tabBtn'>Devotions</IonButton>
          <IonButton fill='clear' id='3' onClick={() => switchTab('3')} className='tabBtn'>Discussions</IonButton>
        </div>
        {/* <IonContent className='tabInfo' style={{backgroundColor:'inherit'}} > */}
          <div className="tabInfoDiv">
            {page == '1' && <Annoce />}
            {page == '2' && <Devotions />}
            {
              page == '3' && 
              (
                <>
                  <Discusions />
                  <div >
                    <IoAddSharp id="addPostBtn" size="30px" onClick={() => {setPage('3.1')}} />
                  </div>
                </>
              )
            }
            { page == '3.1' && <Post setPage={setPage} />}
            
          </div>
        
    </IonPage>
  );
};

// create a post page that will take the prop view and change to display discusiion

export default SubscriptionTabs;
