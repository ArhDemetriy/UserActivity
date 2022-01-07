import { Reducer } from "redux"
import { grafReducer, TGrafReducerAction, TGraph } from "./reducer/grafReducer"
import { TUserReducerAction, TUsers, userReducer } from "./reducer/userReducer"

export interface TDefaultAction {
    type: string
    payload?: Record<string, any>
}

export type TAction =
    | TUserReducerAction
    | TGrafReducerAction

export type TState = {
    /** массив юзеров для таблицы */
    users: TUsers
    /** данные для отображения графиков */
    graph: TGraph
}

const defaultState: TState = {
    users: [],
    graph: {
        histogram: [],
        spline: [],
    },
}

export const reducer: Reducer<TState, TAction> = (state = defaultState, action) => {
    return {
        ...state,
        users: userReducer(state.users, action),
        graph: grafReducer(state.graph, action),
    }
}

export default reducer
