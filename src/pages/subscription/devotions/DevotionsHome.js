import { IonCard, IonButton, IonCardContent, IonRouterOutlet, IonCardSubtitle } from "@ionic/react";
import fearless from '../fearless.jpg';
// import Video from "./dummy.mp4"
import '../devotions/Devotions.css'
import { Link } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import vid from '../dummy.mp4'

import React from "react";

const DevotionsHome = ({setPages}) => {

    // dummy list to display 6 dummy videos
    const loop = [1,2,3,4, 5, 6];
    // Time out to limit video playback
    let previewTimeout = null;

    // expand devotional massage
    function readMore(event){
        var content = document.getElementById('devotionContent')
        var button = event.target
        var card = document.getElementById('devotionCard')
        console.log(content)


        if (button.innerHTML == 'Read'){
            card.style.transform = 'scale(1.05)';
            card.style.height = 'fit-content';
            content.style.height = 'fit-content';
            button.innerHTML = 'Done';
        }
        else {
            content.style.height = '11em';
            button.innerHTML = 'Read';
            card.style.transform = 'scale(1)';
        }
    }

    // preview video on hover
    function startPreview(event) {
        var video = event.target
        video.muted = false;
        video.currentTime = 1;
        video.playbackRate = 1.5;
        // video.style.transform = 'scale(1.1)'
        video.play();
      }
      
    function stopPreview(event) {
        var video = event.target
        video.currentTime = 0;
        video.playbackRate = 1;
        // video.style.transform = 'scale(1)'
        video.pause();
      }

    return ( 
        <div className='body '>
            <h6>Daily devotions:</h6>
            <IonCard className='text-center p-2' id='devotionCard'>
                <div className='devoPic'>
                    <img src={fearless} alt="example.png" /><br />
                    
                </div>
                <div className='massage p-2' id='devotionContent'>
                    <h3 className='p-0 m-0'>The word of our God stands forever</h3>
                    <p className='p-2' >
                    The grass withers and the flowers fade, but the word of our God stands forever, Isaiah 40:8
                    Think about all the things around you right now. Look around you and see all the things that will fade away, grass, flowers, all kinds of things in nature and the world around us are going to fade. Think about some of the most basic things you find pleasure in right now - like that favourite show on TV -  that are going to fade. Like grass, all things come to an end.
                    That’s what God is saying through Isaiah, look at all the things that fade in the world. Then, look at the Word of God and know it will never fade. It will stand forever. God wants you to realize the wonder of His word and the value of spending time in it.
                    This Word shows you how to walk right. This Word shows you how to act right. This Word shows you how to live right. You can hide this Word in your heart, so that you won’t have to sin against the Lord (Psalm 119:11). This Word can be a lamp unto your feet and a light unto your path (Psalm 119:105).
                    Everything you and I need to know is in the Bible. The teachings of God, the promises of God, are all spelled out in the word of God. The word of God is true, and it never changes.
                    Live today for that which will matter forever by spending time in God’s everlasting Word.  Remember what Jesus said, do not establish your life on things that moth and rust can consume or where robbers can break in and steal. Instead, establish your life on things that last forever (Matthew 6:19).  
                    Can I ask you to look deep within yourself and ask yourself this question: Am I living this life in accordance with the one true foundation? Am I living life accordance with my faith?
                    Live today for that which is going to matter forever. Spend time in God’s word. The Word has stood the test of time and surely shown that it is here to outlive whatever struggles of life you are faced with.
                    </p>
                </div>
                <IonButton style={{backgroundColor:'#8EB9A7'}} onClick={(e) => readMore(e)}>Read</IonButton>
            </IonCard>

            <h5>Sermons:</h5>
            <div className=''>
                {loop.map((e) =>{
                return(
                    <IonCard key={e} className='sermon' onClick={() => {setPages('2')}}>
                        <video controls={true} src={vid} 
                            onMouseEnter={(e) => {startPreview(e);}}
                            onMouseLeave={(e) =>{stopPreview(e)}}
                        >
                            Your browser does not support the HTML5 Video element.
                        </video>
                        <IonCardSubtitle ><b>Fearless Man</b></IonCardSubtitle>
                    </IonCard>
                )
                })}
            </div>
        </div>
     );
}


export default DevotionsHome;