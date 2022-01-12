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

        const bdUsers = convertToBdUsers(getUsers())
        return FirebaseController.saveAll(bdUsers)
    }

    public static tryLoad() {
        return this.separatePromise(() => FirebaseController.load())
            .then(bdUsers => this.separatePromise(() => convertToReduxUsers(bdUsers)))
            .then(reduxUsers => this.separatePromise(() => UserActions.replaceUsers(reduxUsers)))

        // return FirebaseController.load()
        //     .then(bdUsers => convertToReduxUsers(bdUsers))
        //     .then(reduxUsers => UserActions.replaceUsers(reduxUsers))
    }

    public static safetyLoad() {
        return this.tryLoad()
            .catch(e => console.error(e))
    }

    protected static separatePromise<T>(callback: () => Promise<T> | T, timeout = 0) {
        return new Promise<T>((resolve) => {
            setTimeout(() => { resolve(callback()) }, timeout)
        })
    }
}
