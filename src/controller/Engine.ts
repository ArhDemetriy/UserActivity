import { FirebaseController } from "../api/FirebaseController";
import { UserActions } from "../redux/actions/UserActions";
import { convertToBdUsers, convertToReduxUsers } from "./Engine/converters";
import { getUsers } from "./Engine/getters";
import { Validate } from "./Validate";

export class Engine{
    public static init() {
        return this.safetyLoad()
    }

    public static validate() {
        return Validate.validate()
    }

    public static async trySave() {
        if (!this.validate()) { throw new Error("invalid users data") }

        // const bdUsers = convertToBdUsers(getUsers())
        // return FirebaseController.saveAll(bdUsers)
    }

    public static tryLoad() {
        return FirebaseController.load()
            .then(bdUsers => convertToReduxUsers(bdUsers))
            .then(reduxUsers => UserActions.replaceUsers(reduxUsers))
    }

    public static safetyLoad() {
        return this.tryLoad()
            .catch(e => console.error(e))
    }
}
