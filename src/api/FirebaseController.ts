import { Engine } from "../controller/Engine";
import { ArrayOfUser } from "../redux/store/reducer/userReducer";
import { TBdUsers } from "../types/reactComponents/basic";
import { Firebase } from "./FirebaseController/Firebase";

const enum Collections{
    users = 'users'
}

export class FirebaseController{

    /** загружает и возвращает данные из коллекции users */
    public static load() {
        return Firebase.getDocs<TBdUsers[0]>(Collections.users)
    }

    /** очищает коллекцию users и сохраняет в неё переданный массив */
    public static saveAll(bdUsers: TBdUsers) {
        return Firebase.deleteCollection(Collections.users)
            .then(() => Promise.all(bdUsers
                .map(bdUser => Firebase.add(Collections.users, bdUser))))
    }
}
