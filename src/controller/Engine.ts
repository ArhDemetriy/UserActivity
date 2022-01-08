import { FirebaseController } from "../api/FirebaseController";
import { UserActions } from "../redux/actions/UserActions";
import { convertToReduxUsers } from "./Engine/converters";
import { getUsersForBd } from "./Engine/getters";

export class Engine{
    public static validate() {
        return true
    }

    public static trySave() {
        if (!this.validate()) { return }

        const users = getUsersForBd()
    }

    public static tryLoad() {
        return FirebaseController.load()
            .then(bdUsers => convertToReduxUsers(bdUsers))
            .then(reduxUsers => UserActions.addUsers(reduxUsers))
            .catch(e => console.error(e))
    }
}
