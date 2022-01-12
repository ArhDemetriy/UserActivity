import { TAction, TDefaultAction } from "../reducer"

export const REPLACE_HISTOGRAM = 'REPLACE_HISTOGRAM'
export const REPLACE_SPLINE = 'REPLACE_SPLINE'
export const REPLACE_METRICS = 'REPLACE_METRICS'
export const SET_RETENTION = 'SET_RETENTION'

export function grafReducer(graph: TGraph, action: TAction): TGraph {

    if (action.type === REPLACE_HISTOGRAM && action.payload.histogram ) {
        return { ...graph, histogram: { ...graph.histogram, ...action.payload.histogram } }
    } else if (action.type === REPLACE_SPLINE && action.payload.spline) {
        return { ...graph, spline: action.payload.spline }
    } else if (action.type === SET_RETENTION && action.payload.retention !== undefined) {
        return { ...graph, retention: +action.payload.retention }
    } else if (action.type === REPLACE_METRICS && action.payload.metrics !== undefined) {
        return { ...graph, metrics: { ...action.payload.metrics } }
    }

    return graph
}

export type TGraph = {
    retention: number
    /** высоты столбцов гистограмы */
    histogram: {
        /** нормированные к 1 высоты столбцов гистограмы */
        bins: number[]
        /** высота максимального не нормированного столбца */
        maxBin: number
    }
    /** точки сшивки кривых безье */
    spline: number[]
    /** базовые метрики */
    metrics: {
        average: number
        median: number
        percentile10: number
        percentile90: number
    }
}

export interface TGrafReducerAction extends TDefaultAction {
    type: typeof REPLACE_HISTOGRAM | typeof REPLACE_SPLINE | typeof SET_RETENTION | typeof REPLACE_METRICS
    payload: Partial<TGraph>
}

export default grafReducer
