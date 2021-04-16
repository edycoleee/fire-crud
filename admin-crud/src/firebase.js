//src/firebase.js
//import * as firebase from "firebase/app"; //before firebase v 8.00
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBFm3q7dmiKOIuNlkQy-4Zb9_LpQUYLVlI",
  authDomain: "coba-crud6.firebaseapp.com",
  projectId: "coba-crud6",
  storageBucket: "coba-crud6.appspot.com",
  messagingSenderId: "863929184115",
  appId: "1:863929184115:web:3119e2d58b8d3dc71b5f06",
});

export const auth = app.auth();
export const db = app.firestore();
export const storage = firebase.storage();
export const Firebase = firebase;
