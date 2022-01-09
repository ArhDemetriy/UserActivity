import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../../redux/store/reducer';

interface HistogramSVGProps{
    height?: number
}

export const HistogramSVG: React.FC<HistogramSVGProps> = ({ height = 500 }) => {
    // const maxBin = useSelector((store: TState) => store.graph.histogram.maxBin || 0)
    const bins = useSelector((store: TState) => store.graph.histogram.bins)
    if (!Array.isArray(bins)) { return <svg /> }

    // const mainHeight = Math.round(maxBin * 1.5 + 20)
    const mainHeight = height
    const PADDING = 10
    const BAR_WIDTH = 10
    const GAP = 3

    const xStep = BAR_WIDTH + GAP
    const maxHeight = mainHeight - PADDING * 2

    function getRects() {
        return bins.map((bin, i) => {
            const height = bin * maxHeight
            return <rect
            x={`${i * xStep + PADDING}`}
            y={`${mainHeight - height - PADDING}`}
                width={`${BAR_WIDTH}`}
                height={`${height}`}
                fill="#4A9DFF"
                key={i}
            />
        })
    }

    const mainWidth = bins.length * (BAR_WIDTH + GAP) + PADDING * 2
    return <svg
        width={`${mainWidth}`}
        height={`${mainHeight}`}
        version="1.1" xmlns="http://www.w3.org/2000/svg"
    >
        {getRects()}
    </svg>
}

export default HistogramSVG
