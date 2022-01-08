import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
import { DocumentData } from "firebase/firestore";

export class Firebase{
    protected static readonly app = initializeApp({
        apiKey: "AIzaSyAy2GjQAfutCFa3toa9WLDFTkMehtj_CNk",
        authDomain: "useractivity-4c085.firebaseapp.com",
        projectId: "useractivity-4c085",
        storageBucket: "useractivity-4c085.appspot.com",
        messagingSenderId: "1007647890248",
        appId: "1:1007647890248:web:91e91fec7ca033ae29b17d"
    })

    private static readonly selfFirestore = firestore.getFirestore(Firebase.app)
    // public static readonly firestore = firestore

    private static readonly collections: Map<string, ReturnType<typeof firestore['collection']>> = new Map
    protected static getCollection(collectionName: string) {
        if (!this.collections.has(collectionName)) {
            this.collections.set(collectionName, firestore.collection(this.selfFirestore, collectionName))
        }
        return this.collections.get(collectionName)!
    }

    public static add<T extends Record<string, number | string>>(collection: string, data: T) {
        return firestore.addDoc(this.getCollection(collection), data)
    }

    protected static getFirestoreDocs(collection: string) {
        return firestore.getDocs(firestore.collectionGroup(this.selfFirestore, this.getCollection(collection).id))
    }

    /** получает все документы коллекции, затем их все удаляет */
    protected static deleteCollection(collection: string) {
        return this.getFirestoreDocs(collection)
        .then(result => result.docs.map(doc => doc.ref))
        .then(docRefs => docRefs.forEach(ref => firestore.deleteDoc(ref)))
    }

    /** возвращает все документы коллекции */
    public static getDocs<T extends DocumentData = DocumentData>(collection: string) {
        return this.getFirestoreDocs(collection)
            .then(result => result.docs
                .map(doc => doc.data() as T)
            )
    }

    public static init() { }
}

