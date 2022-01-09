import React from 'react';
import './Graph.scss';
import { Histogram } from './Histogram/Histogram';
import { Retention } from './Retention/Retention';

export const Graph: React.FC = () => {
    return <div
        className="graph"
    >
        <Retention />
        <Histogram />
    </div>
}

export default Graph

