// example of how to use funtion below

import { collection, getDocs, query, where } from "@firebase/firestore";
import { firestoreObj } from "../firebase/firebase";

var Session = (function() {
    var first_name = "";
    var email = ""
    var last_name = ''
    var is_leader = ''
    var is_premium = ''
    var phone_no = ''
    var user_id = ''
    var profile_pic = ''

    
    var setUser = async function(email) {
      const dbQuery = query(
        collection(firestoreObj, "Users"),
        where("email", "==", email)
      );
      const queryResults = await getDocs(dbQuery);
      queryResults.forEach(async(user) => {
        // Add an ID to video data
        var data = user.data();
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('first_name', data.firstname);
        sessionStorage.setItem('last_name', data.lastname);
        sessionStorage.setItem('is_leader', data.isLeader)
        sessionStorage.setItem('is_premium', data.isPremiun);
        sessionStorage.setItem('user_id', data.userId);
        sessionStorage.setItem('phone_no', data.phoneNumber);
  
        const dbQuery = query(
          collection(firestoreObj, "userProfilePic"),
          where("userId", "==", data.userId)
        );
        const queryResults = await getDocs(dbQuery);
        queryResults.forEach((pic) => {
          sessionStorage.setItem('profile_pic', pic.data().photo);
        })


        

      });
    };

    var getFirstName = function() {
      first_name = sessionStorage.getItem('first_name');
      return first_name;
    };

    var getEmail = function() {
      email = sessionStorage.getItem('email');
      return email;
    };

    var getLastName = function() {
      last_name = sessionStorage.getItem('last_name');
      return last_name;
    };
    var getIsLeader = function() {
      is_leader = sessionStorage.getItem('is_leader');
      return is_leader;
    };
    var getIsPremium = function() {
      is_premium = sessionStorage.getItem('is_premium');
      return is_premium;
    };
    var getPhone = function() {
      phone_no = sessionStorage.getItem('phone_no');
      return phone_no;
    };
    var getUserId = function() {
      user_id = sessionStorage.getItem('user_id');
      return user_id;
    };
    var getPhoto = function() {
      profile_pic = sessionStorage.getItem('profile_pic');
      return profile_pic;
    };
    var clearUser = function() {
      user_id = sessionStorage.clear()
    };
  
    return {
      // get user details functions
      getFirstName: getFirstName,
      getLastName: getLastName,
      getEmail: getEmail,
      getIsLeader: getIsLeader,
      getIsPremium: getIsPremium,
      getPhone: getPhone,
      getPhoto: getPhoto,
      getUserId:getUserId,

      // set user details
      setUser: setUser,

      // logout and clear user
      clearUser: clearUser
    }
  
  })();
  
  export default Session;

  // import session to your file and access all data using the above funtions
  // name = Session.getFirstName()  returns user name
  // to change all user details simply call the setUser funtion and pass user email
  // Session.setUser(ns@gmail.com) set all user details to the updated in databse