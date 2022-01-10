import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import './Histogram.scss';
import { HistogramSVG } from './HistogramSVG/HistogramSVG';

export const Histogram: React.FC = () => {
    const histogramIsExists = useSelector((store: TState) => !!store.graph.histogram.bins?.length)

    return <div
        className="histogram"
    >
        {histogramIsExists && <HistogramSVG />}
    </div>
}

export default Histogram
