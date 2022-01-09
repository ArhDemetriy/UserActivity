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

    /** замена точек гистограмы */
    static replaceHistogram(bins: Required<TGrafReducerAction['payload']>['histogram']['bins']) {
        const maxBin = Math.max(...bins)

        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram: { bins, maxBin } },
        })
    }

    /** добавление точек в конец гистограмы */
    static pushHistogramBins(binsSlice: Required<TGrafReducerAction['payload']>['histogram']['bins']) {
        const bins = store.getState().graph.histogram.bins.concat(binsSlice)
        const maxBin = Math.max(...bins)

        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram: { bins, maxBin } },
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
