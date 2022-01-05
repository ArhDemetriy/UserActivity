import { Reducer } from "redux"
import { grafReducer, TGraph } from "./reducer/grafReducer"
import { TUserReducerAction, TUsers, userReducer } from "./reducer/userReducer"

export interface TDefaultAction {
    type: string
    payload?: { [k in string]: any }
}

type TAction =
    | TUserReducerAction
    // | TDefaultAction


type TState = {
    users: TUsers
    graph: TGraph
}

const defaultState: TState = {
    users: [],
    graph: [],
}

export const reducer: Reducer<TState, TAction> = (state = defaultState, action) => {
    return {
        ...state,
        users: userReducer(state.users, action),
        graph: grafReducer(state.graph, action),
    }
}

export default reducer
