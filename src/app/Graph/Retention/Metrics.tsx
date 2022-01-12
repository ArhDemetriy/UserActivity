import React from 'react';
import { useSelector } from 'react-redux';
import { getRoundedToRank } from '../../../controller/Engine/converters';
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
            {`Rolling Retention 7 day: ${getRoundedToRank(retention)}`}
        </span>
        <span>
            {`LifeTimes:`}
        </span>
        <span>
            {`average : ${getRoundedToRank(metrics.average, 1)}`}
        </span>
        <span>
            {`median : ${getRoundedToRank(metrics.median)}`}
        </span>
        <span>
            {`10 percentile : ${getRoundedToRank(metrics.percentile10)}`}
        </span>
        <span>
            {`90 percentile : ${getRoundedToRank(metrics.percentile90)}`}
        </span>
    </div>
}

export default Metrics

