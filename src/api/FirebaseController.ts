import { TBdUsers } from "../types/reactComponents/basic";
import { Firebase } from "./FirebaseController/Firebase";

const USERS = 'users'

export class FirebaseController{

    /** загружает и возвращает данные из коллекции users */
    public static load() {
        return Firebase.getDocs<TBdUsers[0]>(USERS)
    }

    /** очищает коллекцию users и сохраняет в неё переданный массив */
    public static saveAll(bdUsers: TBdUsers) {
        return Firebase.deleteCollection(USERS)
            .then(() => Promise.all(bdUsers
                .map(bdUser => Firebase.add(USERS, bdUser))))
    }
}
