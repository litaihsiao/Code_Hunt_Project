import React, {Component} from 'react';
import ProductList from '../Product/ProductList';
import Firebase from 'firebase';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      productList: []
    }

    var firebase = require("firebase");
    var config = {
      apiKey: "AIzaSyCmLLghNtubtq7A16EUL84CdUcMGPJoe90",
      authDomain: "codehunting-d2b7c.firebaseapp.com",
      databaseURL: "https://codehunting-d2b7c.firebaseio.com/",
      storageBucket: "gs://codehunting-d2b7c.appspot.com",
    };
    firebase.initializeApp(config);

    var db = firebase.database();
    var firebaseRef = db.ref("/products");
    firebaseRef.on('value', (snapshot) => {
      var products = snapshot.val();

      this.setState({
        productList: products
      })
    });
  }

  render() {
    return (
      <section>
        <header>
          <img src="/img/banner.jpeg" width="100%" />
        </header>

        <section>
          <section className="container">
            {
              this.state.productList
              ?
              <ProductList productList={this.state.productList}/>
              :
              null
            }
          </section>
        </section>
      </section>
    );
  }
}

export default HomePage;
