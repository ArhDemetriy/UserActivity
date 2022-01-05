import { store } from "../store";
import { ADD_USERS, TUserReducerAction } from "../reducer/userReducer";

export class UserActions {
    static setUser(payload: TUserReducerAction['payload']) {
        store.dispatch({
            type: ADD_USERS,
            payload,
        })
    }
}
