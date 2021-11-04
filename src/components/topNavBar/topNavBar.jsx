
import { FaArrowLeft, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './topNavBar.css';


const TopNavBar = () => {



  return (
    <div className="tabbarContainer" > 
      <div className="tabbar" slot="fixed" >
        <Link to="/userhome" > <FaArrowLeft className="iconHover" /> </Link>
        <FaEllipsisH className="iconHover" />
      </div>
    </div>
  );
}
export default TopNavBar;