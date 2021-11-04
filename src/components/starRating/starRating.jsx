import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";

const colors = {
    orange: "yellow",
    grey: "#a9a9a9"    
};

function Stars( props ) {
  const [currentValue, setCurrentValue] = useState(0);
  // const [hoverValue, setHoverValue] = useState();
  
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    props.setHoverValue(newHoverValue)
  };

  // const handleMouseLeave = () => {
    // props.setHoverValue(undefined)
  // }

  const addStar = ( index, e ) => {
    
    console.log(index + 1)
    
    handleClick(index + 1)
    
    // props.setHoverValue(e.target.value)
    console.log(props.hoverValue)
    // alert( currentValue )
  }



  return (
    <div>
      
        {/* {GiConsoleController.log("new value", currentValue)} */}

        {stars.map((_, index) => (
            <FaStar
              key={index}
              size={15}
              value={props.hoverValue}
              onClick = {(e) => addStar(index, e)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={() => handleMouseOver(index + 1)}
              color={(props.hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        )}     
      
    </div>
  );
};

export default Stars;