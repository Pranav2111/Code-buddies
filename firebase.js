// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWrDJk-HYQvxm6kqlC78DGboM6ExJGaUs",
    authDomain: "code-buddies-ace06.firebaseapp.com",
    projectId: "code-buddies-ace06",
    storageBucket: "code-buddies-ace06.appspot.com",
    messagingSenderId: "801552355079",
    appId: "1:801552355079:web:3dbc20f117a968cc473fa2",
    measurementId: "G-HPFY1522BC"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);

export {app, db, storage, analytics};