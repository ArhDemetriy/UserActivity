import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
    apiKey: "AIzaSyAy2GjQAfutCFa3toa9WLDFTkMehtj_CNk",
    authDomain: "useractivity-4c085.firebaseapp.com",
    projectId: "useractivity-4c085",
    storageBucket: "useractivity-4c085.appspot.com",
    messagingSenderId: "1007647890248",
    appId: "1:1007647890248:web:91e91fec7ca033ae29b17d"
})

export const selfFirestore = getFirestore(app)

