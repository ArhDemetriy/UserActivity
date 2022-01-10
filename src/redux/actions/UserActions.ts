import { store } from "../store";
import { ADD_USERS, REPLACE_USERS, TUser, TUserReducerAction } from "../store/reducer/userReducer";

export class UserActions {
    static addUsers(users: TUserReducerAction['payload']['users']) {
        store.dispatch({
            type: ADD_USERS,
            payload: {
                users
            },
        })
    }

    static updateUser(user: TUser, to: number) {
        const users = store.getState().users
        let i = to
        if (!Number.isFinite(to) || to < 0) {
            i = 0
        } else if (to > users.length - 1) {
            i = users.length - 1
        }
        const temp = users[i]
        users[i] = { ...temp, ...user }
        store.dispatch({
            type: REPLACE_USERS,
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
