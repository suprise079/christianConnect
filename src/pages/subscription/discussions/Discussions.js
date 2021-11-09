import { IonItem, IonLabel, IonSearchbar, IonCard, } from '@ionic/react';
import { IoAddSharp } from 'react-icons/io5';
import { GiPrayer } from 'react-icons/gi';
import { FaCross } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import './Discussions.css';
import React, { useEffect, useState } from 'react';
import { collection, docs, doc, getDocs, getDoc, limit, query, queryEqual, where } from 'firebase/firestore';
import { firestoreObj } from '../../../firebase/firebase';
import DisplayReplies from './Replys';
import AddReply from './addReply';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useParams } from 'react-router';


const Discussions = () => {

  const [searchText, setSearchText] = useState('');
  // current fellowshipId
  const fellowshipId = useParams()
  // set the selected reply
  const [selectedReply, setSelectedReply] = useState("")
  // set selected add reply
  const [addReply, setAddReply] = useState("")
  // fellowship posted discussions
  const [posts, setPosts] = useState([])
  // form for adding replies
  const [addComment, setAddComment] = useState(false);

  function viewRepys(event,id){
    var card = document.getElementById(id)
    if (selectedReply == ""){
      card.style.transform = 'scale(1.06)'
      setSelectedReply(id)
    }
    else {
      card.style.transform = 'scale(1)'
      setSelectedReply("")
    }
  }

  useEffect(async () => {
    var foundDiscussions = []
    const dbQuery = query(collection(firestoreObj, 'discussion'),
      where("fellowshipId", "==", fellowshipId.fellowshipId))
    const queryResults = await getDocs(dbQuery)
    
    queryResults.forEach((dis) => {
      // add discussion Id to data
      var data = dis.data()
      data['id'] = dis.id
      data['date'] = dis.data().date.toDate().toString().substring(0, 15)
      foundDiscussions.push(data)
    })
    setPosts(foundDiscussions)
  },[])

  

  return (
    <div id='page'>
      
      {/* add post button */}
      <div className='discussionContainer' >
      
        {/* search */}

        <IonSearchbar className='searchbar' value={searchText} onIonChange={e => setSearchText(e.detail.value)}></IonSearchbar>


        <div >
          {console.log("List of discussions",posts)}
          {
            posts.map((post) => {
              return (
                <>
                  <IonCard className='posts' id={post.id} style={{transform:selectedReply==post.id?"scale(1.06)":"scale(1)"}}>
                    {/* fellewship discussions */}
                    <img className='postImg' alt='profilePicture' src={post.userPic} />
                    <h3>{post.firstName} {post.lastName}</h3>
                    <p className='date'>{post.date}</p>
                    <p className='content'>{post.text}</p>
                    <div id='postBtns'>
                      {selectedReply != post.id && <button id='1' onClick={(e) => { viewRepys(e,post.id) }}>View replies<MdKeyboardArrowDown size='20'/></button>}
                      {selectedReply == post.id && <button id='1' onClick={(e) => { viewRepys(e,post.id) }}>Close replies<MdKeyboardArrowUp size='20'/></button>}
                      <button onClick={(e) => { setAddReply(post.id); }}>Reply</button>
                    </div>

                    {/* replies container */}
                    {
                      selectedReply == post.id && (
                        <div className='replies' >
                          <DisplayReplies discussionId={post.id}/>
                        </div>
                      )
                    }

                    {/* add reply container */}
                    {
                      addReply == post.id &&
                      <div className='addComment' >
                        <AddReply discussionId={post.id}/>
                      </div>
                    }

                  </IonCard>

                 
                </>
              )
            })
          }
          
        </div>
      </div>

    </div>
  );
};

export default Discussions;





// var ? cu : cd
// deposit: 8,722
// withdrawal: 12,634