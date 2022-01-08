import { Engine } from "../controller/Engine";
import { ArrayOfUser } from "../redux/store/reducer/userReducer";
import { TBdUsers } from "../types/reactComponents/basic";
import { Firebase } from "./FirebaseController/Firebase";

const enum Collections{
    users = 'users'
}

export class FirebaseController{
    public static init() {
        Firebase.init()
        Engine.tryLoad()
    }

    public static load() {
        return Firebase.getDocs<TBdUsers[0]>(Collections.users)
    }
}
