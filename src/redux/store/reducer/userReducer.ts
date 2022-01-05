import { TAction, TDefaultAction } from "../reducer"

export const ADD_USERS = 'ADD_USERS'

export function userReducer(users: TUsers, action: TAction) {
    if (action.type == ADD_USERS) {
        return users.concat(action.payload.users)
    }
    return users
}

export type TUsers = TUser[]

export interface TUserReducerAction extends TDefaultAction {
    type: typeof ADD_USERS
    payload: {
        // это не TUsers, этот тип не обязан меняться при изменении TUsers
        users: TUser[]
    }
}

type TUser = {
    id: number
    registration: Date
    lastActivity: Date
}

export default userReducer
