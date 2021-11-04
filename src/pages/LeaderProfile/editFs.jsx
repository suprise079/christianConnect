
import {
  IonContent,
  // IonHeader, IonTitle, IonToolbar,IonMenu,
  IonPage,
  IonCard,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
  IonInput,
} from "@ionic/react";

// get css
import "./editFs.css"

import {
  logOutSharp,
  logOutOutline,
  bookmarkSharp,
  bookmarkOutline,
  createSharp,
  createOutline,
  walletSharp,
  walletOutline,
} from "ionicons/icons";

import { FaUserEdit, FaCrown } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import churchImg from "./church.jpeg";



// get context db
import Context from "../../context/Context";

// firebase imports
import { auth } from "../../firebase/firebase";
import Cookies from 'js-cookie';


import React, { useContext, useEffect, useState } from "react";
import { editFS, getLeaderFs } from "../../firebase/firebase-help";

const EditFs = () => {
  const [ toEdit, settoEdit ] = useState(
    JSON.parse(Cookies.get("curLeaderFs") ? Cookies.get("curLeaderFs") : "" )
  );
  const { curUser, setCurUser, fellowship, setFellowship } = useContext( Context );
  const history = useHistory();
  const [ name, setname ] = useState( toEdit?.name );
  const [ time, settime ] = useState( toEdit?.time );
  const [ location, setlocation ] = useState( toEdit?.location );
  const [ about, setabout ] = useState( toEdit?.about );
  const [ isload, setIsload ] = useState( false );




  useEffect(() => {
    // console.log( JSON.parse(Cookies.get("curLeaderFs")) );
    setFellowship( JSON.parse(Cookies.get("curLeaderFs")) );
    setCurUser( JSON.parse( Cookies.get("userData") ) );
  },[])


  function edit_fs() {
    setIsload( true )
    // id, name, about, loc, time
    editFS( fellowship?.id, name, about, location, time ).then(() => {

      getLeaderFs( curUser?.userId ).then( refDoc => {
        var fs = refDoc;
        if( fs ) { // if user data is valid and available
          // set data in global context
          setFellowship( fs );
          // console.log( fs );
          // set current leader fs in session cookie
          Cookies.set("curLeaderFs", JSON.stringify( fs ) )
          setname(""); setabout(""); setlocation(""); settime("");
          setIsload( false )
          alert( name + " updated successfully" )
          history.push( "/leader" ); // route to user page
        }
      })
    })

    setIsload( false )
  }


  return (
    <IonPage >
      
      
      
      <IonContent  id="editFs">
        <h1 > Edit { fellowship?.name } </h1>

        {/* { fellowship?.name } */}

        <div className="form" >

          <div className="field" >
            <input
              value={ name }
              onChange={ e => setname( e.target.value ) }
              placeholder="Fellowship Name"
            />
          </div>

          <div className="field" >
            <input
              value={ location }
              onChange={ e => setlocation( e.target.value ) }
              placeholder="Fellowship Location"
            />
          </div>

          <div className="field" >
            <input
              type="time"
              value={ time }
              onChange={ e => settime( e.target.value ) }
              placeholder="Fellowship Time"
            />
          </div>

          <div className="field" >
            <textarea
              value={ about }
              onChange={ e => setabout( e.target.value ) }
              placeholder="Fellowship About" >

            </textarea>
          </div>

          <div className="editbtnCont" >
            <button className="editbtn" onClick={ e=> edit_fs() } >
              { isload ? "LOADING.." : "SAVE CHANGES" }
            </button>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditFs;