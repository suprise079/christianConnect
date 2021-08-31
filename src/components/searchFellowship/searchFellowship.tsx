
// import { 
  // upload
// } from 'ionicons/icons';

import React from 'react'

import './searchFellowship.css';


const SearchFellowship: React.FC = () => {


  return (
    <div className="searchFellowship" >
      <div >
        <p className="fellowshipName" > { "Mpumelelo prayer meetings" } </p>
        <p className="subInfo" > { "2" + "km " } away </p>
        <p className="subInfo" > {"student prayer meeting"} </p>
        <p className="subInfo" > {"8pm weekdays"} </p>
      </div>

      <div className="viewInfo" >
        View
      </div>
    </div>
  );

}


export default SearchFellowship;