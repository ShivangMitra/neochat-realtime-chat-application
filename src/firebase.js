import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyD86Q5lmwhKPg7zjmgmUf4mYM_hFwLgsdY",
    authDomain: "neochat-b4369.firebaseapp.com",
    projectId: "neochat-b4369",
    storageBucket: "neochat-b4369.appspot.com",
    messagingSenderId: "377003311289",
    appId: "1:377003311289:web:7ee7d3063e74643a9a1b68"
  }).auth();