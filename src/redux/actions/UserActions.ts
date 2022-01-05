import { store } from "../store";
import { REPLACE_HISTOGRAM, REPLACE_SPLINE, TGrafReducerAction } from "../reducer/grafReducer";

/** диспатчеры store.getState().graph */
export class GraphActions {

    // histogram

    /** замена точек гистограммы */
    static replaceHistogram(payload: Required<Pick<TGrafReducerAction['payload'], 'histogram'>>) {
        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload,
        })
    }

    /** добавление точек в конец гистограммы */
    static pushHistogramBins(payload: Required<TGrafReducerAction['payload']>['histogram'][0][]) {
        const histogram = store.getState().graph.histogram.concat(payload)

        store.dispatch({
            type: REPLACE_HISTOGRAM,
            payload: { histogram },
        })
    }

    // spline

    static replaceSpline(payload: Required<Pick<TGrafReducerAction['payload'], 'spline'>>) {
        store.dispatch({
            type: REPLACE_SPLINE,
            payload,
        })
    }
}
