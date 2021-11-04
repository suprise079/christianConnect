import { IonToolbar, IonTextarea, IonButton } from "@ionic/react";
import {CgCloseR} from 'react-icons/cg'
import {IoCamera, IoVideocam, IoImage, IoDocument, IoArrowBack} from 'react-icons/io5'
import './post.css'
import fearless from '../fearless.jpg';
import React, { useState } from 'react';


const Post = () => {

    // function addDiscussionPost() {

    // console.log('I am discussion post')

    // function saveDiscussion() {
    //     console.log('I am save discussion')
    //     var discussionType = document.getElementById('categoryInpt')!.innerHTML;
    //     var discussionPost = document.getElementById('addDiscussion')!.innerHTML;
        
    //     setPosts(posts.concat({ picture: demoProfile, name: 'Jack Black', date: '29 September 2021', content: discussionPost, reply: 'replys here', id: 5, type: discussionType }))
    // }

    return (
        <div className='commentForm'>
        
        <form action="" >

            <div className="heading">
                <IoArrowBack size='25' />
                <button>Post</button>
            </div>

            <div className='profile'>
                <img src={fearless} alt="" />
                <div>
                    <p>Suprise ngoveni</p><br />
                    <select name="category" id="">
                        <option value="">catergory</option>
                        <option value="Relationhip">Relationships</option>
                        <option value="identity">Identity in Christ</option>
                        <option value="spitual">Spiritual Warfare</option>
                    </select>
                </div>
            </div>

            <div className="textarea">
                <IonTextarea value="" placeholder="What do you want to talk about?" ></IonTextarea>
                <div className="addedPhotos"></div>
                <div className='media'>
                    <div className="addMedia">
                        <IoCamera size='25' className='m-1' />
                        <IoVideocam size='25' className='m-1' />
                        <IoImage size='25' className='m-1' />
                        <IoDocument size='25' className='m-1' />
                    </div>
                    <IonButton>Post</IonButton>
                    
                </div>
            </div>

        </form>
        </div>
    );

}

export default Post;