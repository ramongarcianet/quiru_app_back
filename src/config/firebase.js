// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYLN9obcWpHCL0KLdQFhdB4mHD5gsFOt8",
  authDomain: "quiru-b444f.firebaseapp.com",
  projectId: "quiru-b444f",
  storageBucket: "quiru-b444f.appspot.com",
  messagingSenderId: "953856024887",
  appId: "1:953856024887:web:9fcc77f3fd4e46e90efab2",
  measurementId: "G-F756MY0VB1"
};

// Initialize Firebase
let app
let analytics 
let firestore
let auth
const iniciarFirebase = ()=> {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    firestore = getFirestore()
    auth = getAuth()
}

export {
    iniciarFirebase,
    firestore,
    auth
}