import { store } from "../store";
import { ADD_USERS, REPLACE_USERS, TUserReducerAction } from "../store/reducer/userReducer";

export class UserActions {
    static addUsers(users: TUserReducerAction['payload']['users']) {
        store.dispatch({
            type: ADD_USERS,
            payload: {
                users
            },
        })
    }

    static replaceUsers(users: TUserReducerAction['payload']['users']) {
        store.dispatch({
            type: REPLACE_USERS,
            payload: {
                users
            },
        })
    }
}
