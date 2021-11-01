import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { firestoreObj } from "../../../firebase/firebase";


const DisplayReplies = ({discussionId}) => {
    
    const [replys, setReplys] = useState([])

    // get comment repleys
    useEffect(async() => {
        console.log("discussionId passed: ",discussionId)
        const dbQuery = query(collection(firestoreObj, "replys"), 
                            where("discussionId","==",discussionId))
        const queryResults = await getDocs(dbQuery);
        var storeData = []
        queryResults.forEach(async(reply) =>{
            // data adds Id to the data object
            var data = reply.data()
            data['id'] = reply.id
            data['date'] = reply.data().date.toDate().toString().substring(0, 15)
            storeData.push(data)
        })
        console.log("found replys: ",storeData)
        setReplys(storeData)
    },[])
      
    return (
      <>
      {console.log("Replys: ", replys)}
        {
          replys.map((reply) => {
            return (
              <div className='replies'>
                <hr />
                <img className='postImg' alt='picture' src={reply.userPic} />
                {/* name */}
                <h3>{reply.firstName} {reply.lastName}</h3>
                {/* date */}
                <p className='date'>{reply.date}</p>

                <p className='commentContent'>
                  {reply.text}
                </p>
              </div>
            )
          })
        }
      </>
    );
  }

  export default DisplayReplies;