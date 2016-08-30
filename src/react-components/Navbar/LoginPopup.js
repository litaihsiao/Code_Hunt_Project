import React from 'react';
import Popup from './Popup';
import Firebase from 'firebase';

class LoginPopup extends React.Component {
  handleLogin = () =>{
   var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // add console.log to show user
      console.log('longin successfully',user)
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }; 

  render() {
    return (
      <Popup {...this.props} style="login-popup">
        <img src="/img/kitty.png"/>
        <h1>Login to Join The Community</h1>
        <p>CodeHunt is a Community to share and geek out about the latest code, podcast and news. Join us :)</p>
        <button className="facebook-btn" onClick={this.handleLogin}>Login with Facebook</button>
        <p>We'll never post to Facebook without your permission.</p>
      </Popup>
    );
  }
}

export default LoginPopup;