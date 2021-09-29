import { IonItem, IonLabel, IonSearchbar, IonCard, } from '@ionic/react';
import { IoAddSharp } from 'react-icons/io5';
import { GiPrayer } from 'react-icons/gi';
import { FaCross } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import './Discussions.css';
import React, { useState } from 'react';
import demoProfile from '../demoprofilepic.jpeg';


const Discusions: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const [types, setTypes] = useState(0);
  const [all, setAll] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [fil, setFilt] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // set replys to disply the clicked comment
  const [replyId, setReplyId] = useState('1')
  // Display replies under discussion post
  const [reply, setReply] = useState(false);
  

  //useEffect

  const [posts, setPosts] = useState([
    { picture: demoProfile, name: 'Malebo Moleleki', date: '14 September 2021', content: 'I am so blessed to have found this fellowship. #IdentityInChrist', reply: 'reply id', id: 1, type: 'relationship'},
    { picture: demoProfile, name: 'Jane Doe', date: '4 September 2021', content: 'I am so blessed to have found this fellowship. #IdentityInChrist', reply: 'replys here', id: 2, type: 'relationship' },
    { picture: demoProfile, name: 'Emily Blunt', date: '14 August 2021', content: 'I am so blessed to have found this fellowship. #IdentityInChrist', reply: 'replys here', id: 3, type: 'identity' },
    { picture: demoProfile, name: 'Jack Black', date: '29 September 2021', content: 'I am so blessed to have found this fellowship. #IdentityInChrist', reply: 'replys here', id: 4, type: 'identity' }
  ])

  // Comments or Replies List

  const [replys, setReplys] = useState([
    { postId: 1, name: 'Suprise ngoveni', date: '14 september', content: 'I am happy to joinin hey', id: 1 , },
    // {postId:1, name:'Suprise ngoveni', date:'14 september', content:'I am happy to joinin hey', id:2},
    { postId: 2, name: 'MC moleleki', date: '14 september', content: 'I am happy to joinin hey', id: 1 },
    { postId: 2, name: 'MC moleleki', date: '14 september', content: 'I am happy to joinin hey', id: 2 }
  ])


  // Display Discussion

  function displayReplies() {

    var commentReplys = replys.filter((reply) => replyId == reply.postId.toString())
    console.log(commentReplys)

    return (
      <>
        {
          commentReplys.map((reply) => {
            return (
              <div className='replies'>
                <hr />
                <img className='postImg' alt='picture' src="" />
                {/* name */}
                <h3>{reply.name}</h3>
                {/* date */}
                <p className='date'>{reply.date}</p>


                <p className='commentContent'>
                  {reply.content}
                </p>
              </div>
            )
          })
        }
      </>
    );

  }

  // Add Discussion post
  const [addDiscussion, setAddDiscussion] = useState(false);

  function addDiscussionPost() {

    console.log('I am discussion post')

    function saveDiscussion() {
      console.log('I am save discussion')
      var discussionType = document.getElementById('categoryInpt')!.innerHTML;
      var discussionPost = document.getElementById('addDiscussion')!.innerHTML;
      
      setPosts(posts.concat({ picture: demoProfile, name: 'Jack Black', date: '29 September 2021', content: discussionPost, reply: 'replys here', id: 5, type: discussionType }))
    }

    return (
      <div className='commentForm'>
        
        <form action="" >

          <input type="text" name="categpry" id="categoryInpt" placeholder='Enter category'/>
          <textarea id='addDiscussion' placeholder='Add a post'></textarea>
          <button type="submit" id='postComment' onClick={() => {saveDiscussion(); setAddDiscussion(false)}} >Post</button>

        </form>
      </div>
    );
  }

  // form for adding replies
  const [addComment, setAddComment] = useState(false);

  function addReply() {
    
    function saveReply() {
      console.log('I saved the post')
      var commentReply = document.getElementById('addComment')!.innerHTML
      setReplys(replys.concat({ postId: 1, name: 'tadaa', date: '14 september', content: commentReply, id: 2 }))
    }

    return (
      <div>
        <form action="" onSubmit={(e) => {
          e.preventDefault()
        }}>
          <hr />
          <textarea id='addComment' placeholder='Add as comment'></textarea>
          <button type="submit" id='postComment' onClick={() => {saveReply(); setAddComment(!addComment); setAddDiscussion(false)}} >Post</button>

        </form>
      </div>
    );
  }

  // filter via categories

  function relationship() {
    setFilt([]);
    setFilt(all.filter((n) => n % 2 === 0))
  }

  function identity() {
    setFilt([]);
    setFilt(all.filter((n) => n % 2 != 0))
  }

  function spiritual() {
    setFilt([]);
    setFilt(all.filter((n) => n % 3 === 0))
  }


  return (
    <div id='page'>
      
      
      <div className='discussionContainer' style={{position:'relative'}}>
      
        {/* search */}

        <IonSearchbar className='searchbar' value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>

        {/* categories */}
        <div className='categoriesContainer'>
          <h3>Categories</h3>

          <div className='alignItems' onClick={e => { relationship() }}>
            <AiFillHeart className='categoryIcons' />
            <IonLabel className='categoryItems' >
              Relationships
            </IonLabel>
            {/* <hr style={{width:'95%'}}/> */}
          </div>

          <div className='alignItems' onClick={(e) => { identity() }}>
            <FaCross className='categoryIcons'   />
            <IonLabel className='categoryItems' >
              Identity in Christ
            </IonLabel>
            {/* <hr style={{width:'95%'}} /> */}
          </div>

          <div className='alignItems' onClick={(e) => { spiritual() }}>
            <GiPrayer className='categoryIcons' />
            <IonLabel className='categoryItems'  >
              Spiritual Warfare
            </IonLabel>
          </div>

        </div>


        <div >
          {
            posts.map((post) => {
              return (
                <>
                  <IonCard className='posts' >
                    {/* image */}
                    <img className='postImg' alt='profilePicture' src={post.picture} />

                    {/* name */}
                    <h3>{post.name}</h3>
                    {/* date */}
                    <p className='date'>{post.date}</p>


                    <p className='content'>
                      {post.content}
                    </p>

                    <div id='postBtns'>
                      <p id='1' onClick={(e) => { setReply(!reply); setAddComment(false) }}>{'number of '} replies</p>

                      <button onClick={(e) => { setAddComment(!addComment); setReply(false) }}>Reply</button>
                    </div>

                    {/* replies container */}

                    {
                      reply == true &&

                      <div className='replies' >
                        {displayReplies()}
                      </div>
                    }

                    {/* add reply container */}

                    {
                      addComment == true &&

                      <div className='addComment' >
                        {addReply()}
                      </div>
                    }

                  </IonCard>

                 
                </>
              )
            })
          }
          { addDiscussion ? addDiscussionPost():""}
        </div>

        {/* add post button */}
        <div >
          <IoAddSharp id="addPostBtn" size="30px" onClick={(e) => { setAddDiscussion(true); console.log('I am working');  }} />
        </div>
         {/* pop up container */}

        {
          addDiscussion == true &&
          
          <div className='popUp'>
            <div className='popUpContent'>

              {addDiscussionPost()}

            </div>                     
           </div>
        }


        


      </div>

    </div>
  );
};

export default Discusions;

