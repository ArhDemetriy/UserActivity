import { store } from "../store";
import { REPLACE_HISTOGRAM, REPLACE_SPLINE, SET_RETENTION, TGrafReducerAction } from "../store/reducer/grafReducer";

/** диспатчеры store.getState().graph */
export class GraphActions {
    // retention

    static setRetention(retention: Required<TGrafReducerAction['payload']>['retention']) {
        store.dispatch({
            type: SET_RETENTION,
            payload: {
                retention
            },
        })
    }

    // histogram

    /** замена точек гистограммы */
    static replaceHistogram(histogram: Required<TGrafReducerAction['payload']>['histogram']) {
        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram },
        })
    }

    /** добавление точек в конец гистограммы */
    static pushHistogramBins(histogramSlice: Required<TGrafReducerAction['payload']>['histogram']) {
        const histogram = store.getState().graph.histogram.concat(histogramSlice)

        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram },
        })
    }

    // spline

    static replaceSpline(spline: Required<TGrafReducerAction['payload']>['spline']) {
        store.dispatch({
            type: REPLACE_SPLINE,
            payload: { spline },
        })
    }
}
