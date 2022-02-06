import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import './Metrics.scss';

export const Metrics: React.FC = () => {
    const retention = useSelector((store: TState) => store.graph.retention)
    const metrics = useSelector((store: TState) => store.graph.metrics)
    if (!Number.isFinite(retention)) { return <div /> }

    return <div
        className="metrics"
    >
        <span>
            {`Rolling Retention 7 day: ${(retention * 100).toFixed(1)}%`}
        </span>
        <span>
            {`LifeTimes:`}
        </span>
        <span>
            {`average : ${metrics.average.toFixed(1)}`}
        </span>
        <span>
            {`median : ${metrics.median.toFixed(1)}`}
        </span>
        <span>
            {`10 percentile : ${metrics.percentile10.toFixed(1)}`}
        </span>
        <span>
            {`90 percentile : ${metrics.percentile90.toFixed(1)}`}
        </span>
    </div>
}

export default Metrics

