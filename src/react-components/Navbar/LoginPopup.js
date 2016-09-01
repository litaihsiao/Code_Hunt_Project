import React, { Component } from 'react';
import Popup from './Popup';
import Actions from '../../actions';

class LoginPopup extends Component {
  handleLogin = () =>{
    Actions.login();
    this.props.hidePopup();
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