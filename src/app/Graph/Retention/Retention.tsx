import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import './Retention.scss';

export const Retention: React.FC = () => {
    const retention = useSelector((store: TState) => store.graph.retention)
    if (!Number.isFinite(retention)) { return <div /> }

    return <div
        className="retention"
    >
        {`Rolling Retention 7 day: ${retention}`}
    </div>
}

export default Retention

