import { IonContent, IonGrid, IonRouterOutlet, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { logoClosedCaptioning, play } from 'ionicons/icons';
import church from './church.jpeg';
import hope from './hope.jpg'
import mpumi from './mpumi.jpg'
import './SubscriptionHome.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import SubscriptionTabs from './subscriptionTabs.js';
import TabBar from "../../components/tabBar/tabBar";
import { collection, getDocs } from '@firebase/firestore';
import { firestoreObj } from '../../firebase/firebase';


const Subscriptions = () => {

  var loop = [1,2,3,4,,5,6,7,8]
  //use state view for now and later use subscriber list length to determine which view to use
  const [view, setView] = useState(true)
  // fellowships
  const [fellowships, setFellowships] = useState([])

  useEffect(async() => {
    // tempory array to store queryed data
    var storeData =[]
    console.log("useEffect")
    const queryResults = await getDocs( collection(firestoreObj, "Fellowships"));
    queryResults.forEach((fellowship) =>{
      // data adds Id to the data object
      var data = {}
      data['id'] = fellowship.id
      data['photo'] = fellowship.data().photo
      data['name'] = fellowship.data().name
      storeData.push(data)
      console.log(fellowship)
    })
    setFellowships(storeData)
  },[])

  return (
    <>
    {
      view == true && (
        <IonPage>
          <div className='body' style={{overflowY:'scroll'}}>

            <IonHeader>
              <IonToolbar>
                <IonTitle className="headerTitle" size="large">Subscriptions</IonTitle>
              </IonToolbar>
            </IonHeader>

          <IonGrid>
            <div className="scrollSubscriptions">
              {/* show only ten and find the rest in view all */}
              {console.log("fellowships",fellowships)}
              <IonRow>
                {
                  fellowships.map((fellowship) => {
                    {var url = "/subscription/"+fellowship.id}
                    return (
                      <>
                        <IonCol id={fellowship.id}><Link to={url} ><img className='highlightImg' src={fellowship.photo} alt='fellow1' /><br />Hope fellowship</Link></IonCol>
                        <IonCol id={fellowship.id}><Link to={url} ><img className='highlightImg' src={fellowship.photo} alt='fellow1' /><br />Hope fellowship</Link></IonCol>
                        <IonCol id={fellowship.id}><Link to={url} ><img className='highlightImg' src={fellowship.photo} alt='fellow1' /><br />Hope fellowship</Link></IonCol>

                      </>
                    )
                  })
                }
               
                {/* <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
                <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
                <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
                <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
                <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol>
                <IonCol id='1'><img className='highlightImg' src={hope} alt='fellow1' /><br />Hope fellowship</IonCol>
                <IonCol id='2'><img className='highlightImg' src={mpumi} alt='fellow2' /><br />Mpumelelo fellowship</IonCol> */}
              </IonRow>
            </div>
            <button id="viewAll" onClick={() => {setView(false)}}>View All</button>
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

          </div>
        </IonPage>
      )
    }
    {
      view == false && (
        <div >
           <IonHeader>
              <IonToolbar>
                <IonTitle className="headerTitle" size="large">Subscriptions</IonTitle>
              </IonToolbar>
            </IonHeader>
          <div className="fellowshipsContainer">
            {
              loop.map((fellowship) => {
                return(
                  <>
                    <div className="fellowship">
                      <img src={hope} alt="fellowship profile" />
                      <h4>Mpumelelo fellowship</h4>
                    </div>
                  </>
                )
              })
            }
          </div>
          
        </div>
        
      )
    }
    {console.log("sub home finished reendering")}
    </>
  );
};

const SubscriptionHome = () => {

  return (
    <>
      <IonReactRouter>
          <IonRouterOutlet>

            <Route exact path="/subscription/:fellowshipId" component={SubscriptionTabs}>
            </Route>
            
            {/* <Route exact path="/SubscriptionHome"> */}
            <Route exact path="/">
              <Subscriptions />
            </Route>

            {/* <Route exact path="/tab3">
              <Tab3 />
            </Route> */}
            
          </IonRouterOutlet>
          {/* the button component tab bar for navigation */}
      </IonReactRouter>
      <TabBar />
    </>
  )
}

export default SubscriptionHome;



// make a function that add two num