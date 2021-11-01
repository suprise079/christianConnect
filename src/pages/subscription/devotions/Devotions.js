import { useEffect, useState } from "react";
import ViewVideos from './viewVideos.js'
import DevotionsHome from './DevotionsHome'
import { VideoContext } from "./VideoContext.js";
import vid from '../dummy.mp4'
import { firestoreObj, storage } from "../../../firebase/firebase.js";
import { ref,getDownloadURL } from "@firebase/storage";
import { collection, getDocs, query, where } from "@firebase/firestore";


const Devotions = () => {

    // store sermon videos
    const [videos, setVideos] = useState([])
    const fellowshipId = 'F0';
    // keep track to which video is playing
    const [playingVideo, setPlayingVideo] = useState({})
    // Router variable for consditional renfering
    const [pages, setPages] = useState('1');

    useEffect(async() => {
        // get fellowship videos data from firestore
        var videosArr = []
        const dbQuery = query(collection(firestoreObj, 'videos'),
                            where("fellowshipId","==",fellowshipId))
        const queryResults = await getDocs(dbQuery)
        queryResults.forEach((video) =>{
            // Add an ID to video data
            var data = video.data()
            data['id'] = video.id
            videosArr.push(data)
        })
        console.log("videos before lik: ",videosArr)
        // get videos from firebase storage
        videosArr.map(async(video) => {
            const videosRef = ref(storage, fellowshipId+"/videos/"+video.storageName)
            await getDownloadURL(videosRef)
            .then((url) =>{
                // add url to video data
                var data = video;
                data['url'] = url;
            })
            .catch((err) => {
                alert("Error: ", err)
            })
        })
        setVideos(videosArr)
        console.log("Videos found: ",videosArr)
    },[])

    return (
        <>
            <VideoContext.Provider value={{videos, playingVideo, setPages, setPlayingVideo}}>
                {pages == '1' && <DevotionsHome />}
                {pages == '2' && <ViewVideos/> }
            </VideoContext.Provider>
        </>
    )
    
}
 
export default Devotions;