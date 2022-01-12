import { Reducer } from "redux"
import { grafReducer, TGrafReducerAction, TGraph } from "./reducer/grafReducer"
import { TUserReducerAction, userReducer } from "./reducer/userReducer"
import { TUsers } from "./reducer/userReducer/userReducer"

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
        retention: NaN,
        histogram: {
            bins: [],
            maxBin: NaN,
        },
        spline: [],
        metrics: {
            average: NaN,
            median: NaN,
            percentile10: NaN,
            percentile90: NaN,
        },
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
