import { IonButton, IonIcon, IonLabel, IonTabButton
} from '@ionic/react';

import { 
 home, codeDownload, downloadSharp, download
} from 'ionicons/icons';

import React, { useContext, useEffect } from 'react'

// for data management and firebase
import Cookies from 'js-cookie';
import Context from '../../context/Context';

import './searchFellowship.css';


const DisplayFellowship = ( props, {fellowshipList=[]} ) => {

    function summary( t ) {
        if( t ) return t.split(" ").splice(0, 5).join(" ") + " ........"
      }

 return (

   <div className="searchFellowship" >
       { fellowshipList.map((data,index) => {
            if (data) {
                return(
                    <div className="info" key={data.name} >
                        <p className="fellowshipName" > { data.name } </p>
                        <p className="subInfo" >
                            {/* { "2" + "km " } away */} { data.location }
                        </p>
                        <p className="subInfo" > { summary( data.about ) } </p>
                        <p className="subInfo" > { data.time } { props.time ? "Hr" : "" } </p>
                    </div>
                )
            }
            return null
            })
        }

        <div className="viewInfo" >
            <IonButton id='viewinfo-btn' href={"/overviewfs?fsid="+ props.fsid }> View </IonButton>
        </div>
     
   </div>
 );

}


export default DisplayFellowship;