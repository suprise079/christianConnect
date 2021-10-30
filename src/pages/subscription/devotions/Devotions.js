import React, { useState } from "react";
import ViewVideos from './viewVideos.js'
import DevotionsHome from './DevotionsHome'



const Devotions = () => {

    // Router variable for consditional renfering
    const [pages, setPages] = useState('1');
    function changePage(parameter){
        setPages(parameter);
    }

    return (
        <>
            {pages == '1' && <DevotionsHome />}
            {pages == '2' && <ViewVideos setPages={(e) => setPages(e)}/> }
        </>
    )
    
}
 
export default Devotions;