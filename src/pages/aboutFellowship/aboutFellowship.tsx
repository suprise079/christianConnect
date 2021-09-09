import React from "react";
import { Link  } from "react-router-dom";


import './aboutFellowship.css'

const AboutFellowship: React.FC = () => {

  return (
    <div className="aboutFellowship" >

      <div className="navigator" >
        <button > Overview </button>
        <button > Reviews </button>      
        <button > Photos </button>      
        <button > About </button>         
      </div>

    </div>
  );
}
export default AboutFellowship;