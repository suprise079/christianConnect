
import React from 'react';
import { Link } from 'react-router-dom';
import './nagivateFs.css';


const NavigateFs = () => {

  return (
    <div className="navigator" >
      <Link to="/overviewfs" > Overview </Link>

      <Link > Reviews </Link> 

      <Link to="/FellowshipPhotos" > Photos </Link> 

      <Link to="/aboutFellowship" > About </Link> 
    </div>
  );
} 


export default NavigateFs;