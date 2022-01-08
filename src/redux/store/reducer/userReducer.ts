import { TAction, TDefaultAction } from "../reducer"

export const ADD_USERS = 'ADD_USERS'
export const REPLACE_USERS = 'REPLACE_USERS'

export function userReducer(users: TUsers, action: TAction) {
    if (action.type === ADD_USERS) {
        return users.concat(action.payload.users)
    } else if (action.type === REPLACE_USERS) {
        return [...action.payload.users]
    }
    return users
}

/** поле в redux. Этот тип можно модифицировать */
export type TUsers = TUser[]

/** просто массив юзеров. Этот тип нельзя модифицировать */
export type ArrayOfUser = TUser[]

export interface TUserReducerAction extends TDefaultAction {
    type: typeof ADD_USERS | typeof REPLACE_USERS
    payload: {
        // это не TUsers, этот тип не обязан меняться при изменении TUsers
        users: ArrayOfUser
    }
}

type TUser = {
    id: number
    registration: Date
    lastActivity: Date
}

export default userReducer
