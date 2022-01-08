import React from 'react';
import './Graph.scss';
import { Retention } from './Retention/Retention';

export const Graph: React.FC = () => {
    return <div
        className="graph"
    >
        <Retention />
    </div>
}

export default Graph

