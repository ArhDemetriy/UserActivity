import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import './Histogram.scss';

export const Histogram: React.FC = () => {
    const maxBin = useSelector((store: TState) => store.graph.histogram.maxBin)
    const bins = useSelector((store: TState) => store.graph.histogram.bins)
    if (!Array.isArray(bins) || !bins.length) { return <div /> }

    return <div
        className="histogram"
    >
    </div>
}

export default Histogram
