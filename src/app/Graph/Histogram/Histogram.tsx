import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import './Histogram.scss';
import { HistogramSVG } from './HistogramSVG/HistogramSVG';

export const Histogram: React.FC = () => {
    // const maxBin = useSelector((store: TState) => store.graph.histogram.maxBin)
    // const bins = useSelector((store: TState) => store.graph.histogram.bins)
    // if (!Array.isArray(bins) || !bins.length) { return <div /> }
    // if (!Number.isFinite(maxBin) || maxBin < 0) { return <div /> }

    return <div
        className="histogram"
    >
        <HistogramSVG />
    </div>
}

export default Histogram
