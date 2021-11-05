import React from 'react';
import img1 from './Church.jpeg';
import img2 from './Church2.jpeg';
import img3 from './prayer.jpeg';

import './topImgFs.css';

const TopImgFs = ( props ) => {

  return (
    <div className="over-photos" >

      {/* left img */}
      <img className = "img1" src={ img1} />

      <div id='right-imgs' >

        {/* top-right img */}
        <img width="100%" className = "img2" src={ img2}/> 

        {/* bottom-right img */}
        <img className = "img3" src={ img3}/>
        
      </div>
    </div>
  );
}
export default TopImgFs;