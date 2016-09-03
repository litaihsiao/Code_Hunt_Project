import alt from '../alt';
import _ from 'lodash';
import Firebase from 'firebase';

class Actions {
    initSession() {
        return (dispatch) => {
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
            firebase.auth().onAuthStateChanged((current) => {
                if (current) {
                    user = {
                        id: current.uid,
                        name: current.displayName,
                        avatar: current.photoURL
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
        return (dispatch) => {
            firebase.auth().signOut();
            setTimeout(() => dispatch(null));
        }
    }

    getProducts() {
        return (dispatch) => {
            var productRef = firebase.database().ref("/products");
            productRef.on("value", (snapshot) => {
                // use lodash to turn objects in firebase to array
                var productValue = snapshot.val();
                var products = _(productValue).keys().map((productKey) => {
                        var item = _.clone(productValue[productKey]);
                        item.key = productKey;
                        return item;
                    })
                    .value();
                dispatch(products);
            });
        }
    }

    addProduct(product) {
        return (dispatch) => {
            var productRef = firebase.database().ref("/products");
            productRef.push(product);
        }
    }

    addVote(productId, userId) {
        return (dispatch) => {
            var upvoteRef = firebase.database().ref().child('products').child(productId).child('upvote');

            var voteRef = firebase.database().ref().child('votes').child(productId).child(userId);
            voteRef.on('value', (snapshot) => {
                if (snapshot.val() == 0) {
                    voteRef.set(true);
                }
                var vote = 0;
                upvoteRef.on('value', (snapshot) => {
                    vote = snapshot.val();
                });
                upvoteRef.set(vote + 1);
            });
        }
    }

    addComment(productId, comment) {
        return (dispatch) => {
            var commentRef = firebase.database().ref().child('comments');
            commentRef.child(productId).push(comment);
        }
    }

    getComments(productId) {
        return (dispatch) => {
            var commentRef = firebase.database().ref().child('comments');
            commentRef.child(productId).on('value', (snapshot) => {
                var commentsVal = snapshot.val();
                var comments = _(commentsVal).keys().map((commentKey) => {
                        var item = _.clone(commentsVal[commentKey]);
                        item.key = commentKey;
                        return item;
                    })
                    .value();
                dispatch(comments);
            });
        }
    }

}
export default alt.createActions(Actions);