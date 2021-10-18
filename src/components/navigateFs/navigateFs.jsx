
import { Link } from 'react-router-dom';
import './navigateFs.css';


const NavigateFs = ( props ) => {

  return (
    <div className="navigator" >
      <Link to="/overviewfs" style={{ borderBottom: props.pn ==="overview" ? ".2em solid white" : "" }} > Overview </Link>

      <Link to="/reviewsfs" style={{ borderBottom: props.pn ==="reviews" ? ".2em solid white" : "" }} > Reviews </Link> 

      <Link to="/FellowshipPhotos" style={{ borderBottom: props.pn ==="photo" ? ".2em solid white" : "" }} > Photos </Link> 

      <Link to="/aboutFellowship" style={{ borderBottom: props.pn ==="about" ? ".2em solid white" : "" }} > About </Link> 
    </div>
  );
} 


export default NavigateFs;