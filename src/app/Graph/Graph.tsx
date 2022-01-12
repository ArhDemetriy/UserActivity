import React from 'react';
import './Graph.scss';
import { Histogram } from './Histogram/Histogram';
import { Metrics } from './Retention/Metrics';

export const Graph: React.FC = () => {
    return <div
        className="graph"
    >
        <Metrics />
        <Histogram />
    </div>
}

export default Graph

