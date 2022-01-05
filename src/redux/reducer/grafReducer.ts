import { TAction, TDefaultAction } from "../reducer"

export const REPLACE_HISTOGRAM = 'REPLACE_HISTOGRAM'
export const REPLACE_SPLINE = 'REPLACE_SPLINE'

export function grafReducer(graph: TGraph, action: TAction): TGraph {

    if (action.type == REPLACE_HISTOGRAM && action.payload.histogram ) {
        return { ...graph, histogram: action.payload.histogram }

    } else if (action.type == REPLACE_SPLINE && action.payload.spline) {
        return { ...graph, spline: action.payload.spline }
    }

    return graph
}

export type TGraph = {
    /** высоты столбцов гистограммы */
    histogram: number[]
    /** точки сшивки кривых безье */
    spline: number[]
}

export interface TGrafReducerAction extends TDefaultAction {
    type: typeof REPLACE_HISTOGRAM | typeof REPLACE_SPLINE
    payload: Partial<TGraph>
}

export default grafReducer
