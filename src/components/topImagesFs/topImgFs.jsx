import React from 'react';
import img1 from './Church.jpeg';
import img2 from './Church2.jpeg';
import img3 from './prayer.jpeg';
import './topImgFs.css';



const TopImgFs = ( props ) => {

  // console.log( props )

  return (
    <div className="over-photos" >

      {/* left img */}
<<<<<<< HEAD
      <img className = "img1" src={ props.photo ? props.photo?.photo : img1} />
=======
      <img className = "img1" src={ img1} />
>>>>>>> d3dc5f36edaaff75bd8b402cae99ad99cb7632a7

      <div id='right-imgs' >

        {/* top-right img */}
<<<<<<< HEAD
        <img width="100%" className = "img2"
          src={ props.photo1 ? props.photo1?.photo : img2} /> 

        {/* bottom-right img */}
        <img className = "img3"
          src={ props.photo2 ? props.photo2?.photo : img3} />
=======
        <img width="100%" className = "img2" src={ img2}/> 

        {/* bottom-right img */}
        <img className = "img3" src={ img3}/>
>>>>>>> d3dc5f36edaaff75bd8b402cae99ad99cb7632a7
        
      </div>
    </div>
  );
}



export default TopImgFs;