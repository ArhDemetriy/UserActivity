import * as firestore from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { selfFirestore } from "./Firebase/init";

export class Firebase{
    // private static readonly app = app

    private static readonly selfFirestore = selfFirestore
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
    public static deleteCollection(collection: string) {
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
}

