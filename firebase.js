import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 
import firebase from './firebase'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDBwUIfUOy8zeh6RCbupcdccwjMHpxrlKs",
    authDomain: "polyjoule-85ad1.firebaseapp.com",
    projectId: "polyjoule-85ad1",
    storageBucket: "polyjoule-85ad1.appspot.com",
    messagingSenderId: "1067756304634",
    appId: "1:1067756304634:web:81ad69ed0b4d501d007143",
    measurementId: "G-HKS5CLJX3Z"
  });

  const db = firebaseApp.firestore(); 

  export default db ; 