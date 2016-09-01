import alt from '../alt';
import Firebase from 'firebase';


class Actions {

  initSession() {
    return(dispatch) => {
      var firebase = require("firebase");
      var config = {
        apiKey: "AIzaSyCmLLghNtubtq7A16EUL84CdUcMGPJoe90",
        authDomain: "codehunting-d2b7c.firebaseapp.com",
        databaseURL: "https://codehunting-d2b7c.firebaseio.com/",
        storageBucket: "gs://codehunting-d2b7c.appspot.com",
      };
      firebase.initializeApp(config);
      // should refactor with this, authData can work, but session can't
      var user;
      firebase.auth().onAuthStateChanged((current_user)=> {
        if (current_user) {
          user = {
            id: current_user.uid,
            name: current_user.displayName,
            avatar: current_user.photoURL
          }
        } else {
          user = null;
        };
        setTimeout(() => dispatch(user));
      });
    }
  }

  login() {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // The signed-in user info.
        var user = {
          id: result.user.uid,
          name: result.user.displayName,
          avatar: result.user.photoURL
        }
        firebase.database().ref().child("users").child(result.user.uid).set(user);
        // dispatch user
        dispatch(user);
      });
    }
  }

  logout() {
    return(dispatch) => {
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        setTimeout(() => dispatch(null));
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }
  }
}

export default alt.createActions(Actions);