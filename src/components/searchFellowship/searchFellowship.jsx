import { IonButton, IonIcon, IonLabel, IonTabButton
 } from '@ionic/react';

import { 
  home, codeDownload, downloadSharp, download
} from 'ionicons/icons';

import React, { useState, useContext, useEffect } from 'react'

// for data management and firebase
import Cookies from 'js-cookie';
import Context from '../../context/Context';
import app, { db } from "../../firebase/firebase";

import { doc, collection, where, query, getDocs, limit, updateDoc, } from "firebase/firestore";

import './searchFellowship.css';

// import SearchBar from '../SearchBar';
import DisplayFellowship from './displayFellowship';


const SearchFellowship = ( props ) => {
  const { allFellowships } = useContext( Context );
  // const search
  const [input, setInput] = useState('');
  const [fellowListDef, setFellowListDef] = useState();
  const [fellowList, setFellowList] = useState();

  // // searchbar function
  // const searchFsBar = async ( ) => {
  //   return await db.collection('Fellowships')
  //   // .where ('name',search.toLowerCase())
  //   // .orderBy('name', 'asc')
  //   // .get()
  //   .then(response => response.json())
  //   .then(data => {
  //     setFellowList(data) 
  //     setFellowListDef(data)
  //   });
  // };

  // const updateInput = async (input) => {
  //   const filtered = fellowListDef.filter(fellowship => {
  //    return fellowship.name.toLowerCase().includes(input.toLowerCase())
  //   })
  //   setInput(input);
  //   setFellowList(filtered);
  // }

  // useEffect( () => {searchFsBar()},[]);


  function summary( t ) {
    if( t ) return t.split(" ").splice(0, 5).join(" ") + " ........"
  }


  return (

    
    <div className="searchFellowship" >
      <div className="info" >
        <p className="fellowshipName" > { props.name } </p>
        <p className="subInfo" >
          {/* { "2" + "km " } away */}  { props.location }
        </p>
        <p className="subInfo" > { summary( props.about ) } </p>
        <p className="subInfo" > { props.time } { props.time ? "Hr" : "" } </p>
      </div>

      <div className="viewInfo" >
        <IonButton id='viewinfo-btn' href={"/overviewfs?fsid="+ props.fsid }>
          View
        </IonButton>
      </div>

      {/* <SearchBar 
        input={input} 
        onChange={updateInput}
      /> */}

      {/* <DisplayFellowship fellowList={fellowList}/> */}
      
    </div>
  );

}


export default SearchFellowship;