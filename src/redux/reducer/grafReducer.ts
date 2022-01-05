import { TDefaultAction } from "../reducer"

export const UPDATE_HISTOGRAM = 'ADD_USERS'

export function grafReducer(graph: TGraph, action: TGrafReducerAction) {
    // if (action.type == UPDATE_HISTOGRAM) {
    //     return users.concat(action.payload.users)
    // }
    return graph
}

export type TGraph = {

}

export interface TGrafReducerAction extends TDefaultAction {
    type: typeof UPDATE_HISTOGRAM
    payload: {
    }
}
