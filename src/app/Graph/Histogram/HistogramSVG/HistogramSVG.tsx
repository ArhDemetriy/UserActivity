import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../../redux/store/reducer';

export const HistogramSVG: React.FC = () => {
    const maxBin = useSelector((store: TState) => store.graph.histogram.maxBin)
    const bins = useSelector((store: TState) => store.graph.histogram.bins)
    if (!Array.isArray(bins) || !bins.length) { return <svg /> }
    if (!Number.isFinite(maxBin) || maxBin < 0) { return <svg /> }

    return <svg
    >
    </svg>
}

export default HistogramSVG
