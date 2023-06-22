// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//DESARROLLO

const firebaseConfig = {
  apiKey: "AIzaSyDYLN9obcWpHCL0KLdQFhdB4mHD5gsFOt8",
  authDomain: "quiru-b444f.firebaseapp.com",
  projectId: "quiru-b444f",
  storageBucket: "quiru-b444f.appspot.com",
  messagingSenderId: "953856024887",
  appId: "1:953856024887:web:9fcc77f3fd4e46e90efab2",
  measurementId: "G-F756MY0VB1"
};*/
//RESERVA
/*
const firebaseConfig = {
  apiKey: "AIzaSyDoRrybGbm1je4kmznbbbyCcqNBu7pZkZI",
  authDomain: "quiru-reserva.firebaseapp.com",
  projectId: "quiru-reserva",
  storageBucket: "quiru-reserva.appspot.com",
  messagingSenderId: "653678486808",
  appId: "1:653678486808:web:83dc647c2763b886dbea6d"
};
/**/
//PRODUCIÓN
/*
const firebaseConfig = {
  apiKey: "AIzaSyCmuv9CEw64vyP6RMNBje3X-feEsbdg4Lw",
  authDomain: "quiru-prod.firebaseapp.com",
  projectId: "quiru-prod",
  storageBucket: "quiru-prod.appspot.com",
  messagingSenderId: "605281793847",
  appId: "1:605281793847:web:7635e785fb4472e24b0cb2",
  measurementId: "G-32SFW0E4RR"
};
*/
// Initialize Firebase
let app
//let analytics
let firestore
let auth
let storage
const iniciarFirebase = ()=> {
    app = initializeApp(firebaseConfig);
    //analytics = getAnalytics(app);
    firestore = getFirestore();
    auth = getAuth();
    storage = getStorage()
}

export {
  iniciarFirebase,
  firestore,
  //analytics,
  auth,
  storage
}