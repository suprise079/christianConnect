
import { FaArrowLeft, FaEllipsisH } from 'react-icons/fa';


import './topNavBar.css';


const TopNavBar = () => {



  return (
    <div className="tabbarContainer" > 
      <div className="tabbar" slot="fixed" >
        <FaArrowLeft className="iconHover" />
        <FaEllipsisH className="iconHover" />
      </div>
    </div>
  );
}
export default TopNavBar;