
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
import { AddFsPhotos, editFS, getLeaderFs } from "../../firebase/firebase-help";

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
  const [ photos, setPhotos ] = useState([]);
  const [ picLoad, setPicLoad ] = useState( false );




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


  function addPics() {
    setPicLoad( true )
    // if photos length is greater than 0, means it contains some pics
    if( photos.length > 0 ) {

      photos.map( (image, ind ) => {
        // uid, fsid, photo
        AddFsPhotos( image?.userId, image?.fsId, image.photo ).then( res => {
          // if last pic in the array and return operation
          if( res && ind === photos.length - 1 ) {
            // wait secs to allow pics to upload..
            setTimeout(() => {
              alert("Photo's Added");
              setPhotos([]); // reset photos array
              setPicLoad( false ); // remove loader
            }, 2000);
          }

        })

      })
    }
    setPicLoad( false )
  }

  const addPhoto = (fileinput) => {
    if (fileinput && fileinput != null) {
      // console.log(fileinput)

      var data = new FileReader()
      // console.log( data )
      // data.onload = function(e) {
      //   console.log( "HERE", e.target.result);
      // };

      data.addEventListener("load", function (d) {
        // console.log("FILE READER", d.target.result)
        setPhotos( photos.concat(
          { userId: curUser?.userId,
            fsId: fellowship?.id,
            photo: d.target.result 
        })) // add this data to pic
      })
      data.readAsDataURL(fileinput);
    }
    else { console.error("READ IMG ERROR") }
  }


  return (
    <IonPage >
      
      
      <IonContent  id="editFs">
        <h1 > Edit { fellowship?.name } </h1>

        {/* { fellowship?.name } */}
        <div className="form" >

          <div className="field" >
            <IonInput
              value={ name }
              onIonChange={ e => setname( e.target.value ) }
              placeholder="Fellowship Name"
            />
          </div>

          <div className="field" >
            <IonInput
              value={ location }
              onIonChange={ e => setlocation( e.target.value ) }
              placeholder="Fellowship Location"
            />
          </div>

          <div className="field" >
            <IonInput
              type="time"
              value={ time }
              onIonChange={ e => settime( e.target.value ) }
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


        <div id="photos" >
          <p >
            <input
              onChange={ e => addPhoto( e.target.files[0] ) }
              type="file" placeholder="Select An Image" />
          </p>

          {/* show the images the user selected here.. */}
          <p >
            { photos && photos.length > 0 ?
                photos.map( (image, ind) => (
                  <img
                    style={{margin:".5em"}}  
                    src={ image.photo } key={ ind } width="50px" />
                )) 
              : "" }
          </p>

          <div style={{textAlign:"center", margin:"1em 0em 0em 0em"}} >
            <button className="editbtn"
              disabled={ picLoad } onClick={ e => addPics() } >
              { picLoad ? "LOADING...." : "ADD PICTURE" }
            </button>
          </div>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default EditFs;