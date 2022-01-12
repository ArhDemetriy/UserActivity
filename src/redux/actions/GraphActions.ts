import { store } from "../store";
import { REPLACE_HISTOGRAM, REPLACE_METRICS, REPLACE_SPLINE, SET_RETENTION, TGrafReducerAction } from "../store/reducer/grafReducer";

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

    /** замена гистограмы */
    static replaceHistogram(histogram: Required<TGrafReducerAction['payload']>['histogram']) {
        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram },
        })
    }

    /** добавление точек в конец гистограмы */
    static pushHistogramBins(binsSlice: Required<TGrafReducerAction['payload']>['histogram']['bins']) {
        const histogram = store.getState().graph.histogram
        const bins = histogram.bins.concat(binsSlice)

        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram: { ...histogram, bins } },
        })
    }

    // spline

    static replaceSpline(spline: Required<TGrafReducerAction['payload']>['spline']) {
        store.dispatch({
            type: REPLACE_SPLINE,
            payload: { spline },
        })
    }

    // metrics

    static replaceMetrics(metrics: Required<TGrafReducerAction['payload']>['metrics']) {
        store.dispatch({
            type: REPLACE_METRICS,
            payload: { metrics },
        })
    }
}
