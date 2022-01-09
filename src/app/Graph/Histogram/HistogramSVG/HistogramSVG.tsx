import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../../redux/store/reducer';

export const HistogramSVG: React.FC = () => {
    // const maxBin = useSelector((store: TState) => store.graph.histogram.maxBin)
    // const bins = useSelector((store: TState) => store.graph.histogram.bins)
    // if (!Array.isArray(bins) || !bins.length) { return <svg /> }
    // if (!Number.isFinite(maxBin) || maxBin < 0) { return <svg /> }

    return <svg width="100" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">

        <rect x="10%" y="10" width="30%" height="30" stroke="transparent" fill="red"/>
        <rect x="60" y="10" width="30" height="30" stroke="transparent" fill="red"/>
    </svg>
}

export default HistogramSVG
