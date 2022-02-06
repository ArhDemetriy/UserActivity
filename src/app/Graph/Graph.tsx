import React from 'react';
import './Graph.scss';
import { Histogram } from './Histogram/Histogram';
import { Metrics } from './Retention/Metrics';

export const Graph: React.FC = () => {
    return <div
        className="graph"
    >
        <Metrics />
        <div className='graph-histogram'>
            <Histogram />
        </div>
    </div>
}

export default Graph

