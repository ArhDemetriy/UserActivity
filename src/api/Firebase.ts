import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";

export class Firebase{
    public static readonly firestore = firestore

    protected static readonly app = initializeApp({
        apiKey: "AIzaSyAy2GjQAfutCFa3toa9WLDFTkMehtj_CNk",
        authDomain: "useractivity-4c085.firebaseapp.com",
        projectId: "useractivity-4c085",
        storageBucket: "useractivity-4c085.appspot.com",
        messagingSenderId: "1007647890248",
        appId: "1:1007647890248:web:91e91fec7ca033ae29b17d"
    })
}

