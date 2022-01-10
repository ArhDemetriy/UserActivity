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

/** поле в redux. Это не просто массив. Если нужен массив пользователей используй TUser[] */
export type TUsers = TUser[]

export interface TUserReducerAction extends TDefaultAction {
    type: typeof ADD_USERS | typeof REPLACE_USERS
    payload: {
        users: TUsers
    }
}

export type TUser = {
    isValid: boolean
    id: number
    registration: Date
    lastActivity: Date
}

export default userReducer
