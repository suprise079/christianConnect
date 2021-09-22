import React from 'react';


import img1 from './Church.jpeg';
import img2 from './Church2.jpeg';
import img3 from './prayer.jpeg';


import './topImgFs.css';



const TopImgFs = ( props ) => {

  return (
    <div className="photos" >
      <p > <img className = "img1" src={ img1} /> </p>

      <div >
        <p > 
          <img width="100%" className = "img2" src={ img2}/> 
        </p>
        <p className="moreImage" > 
          <img className = "img3" src={ img3}/>
        </p>
      </div>
    </div>
  );
}

export default TopImgFs;