import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../../redux/store/reducer';

interface HistogramSVGProps{
    height?: number
}

export const HistogramSVG: React.FC<HistogramSVGProps> = ({ height = 500 }) => {
    const reduxMaxBin = useSelector((store: TState) => store.graph.histogram.maxBin || 0)
    const reduxBins = useSelector((store: TState) => store.graph.histogram.bins)
    const percentile10 = useSelector((store: TState) => store.graph.metrics.percentile10)
    const percentile90 = useSelector((store: TState) => store.graph.metrics.percentile90)

    if (!Array.isArray(reduxBins) || !reduxBins.length || !reduxMaxBin) { return <svg /> }

    const maxBin = reduxMaxBin
    const bins = reduxBins

    const mainHeight = height
    const PADDING = 50
    const BAR_WIDTH = 10
    const GAP = 3

    const xStep = BAR_WIDTH + GAP
    const maxHeight = mainHeight - PADDING * 2
    const mainWidth = bins.length * (BAR_WIDTH + GAP) + PADDING * 2

    /** генерирует столбцы гистограмы. Они растут вверх отступая от нижней границы экрана и боков на PADDING */
    function getRects() {
        const bad = '#FF5151'
        const good = '#5CDC70'

        const result = bins.map((bin, i) => {
            let fill = 'inherit'
            if (percentile10 >= i) {
                fill = bad
            } else if (percentile90 < i) {
                fill = good
            }

            const height = bin * maxHeight
            return <g fill={fill} key={i}>
                <rect
                    x={`${i * xStep + PADDING}`}
                    y={`${mainHeight - height - PADDING}`}
                    width={`${BAR_WIDTH}`}
                    height={`${height}`}
                />
                {!(i % 5) && getText(i)}
            </g>
        })
        return result
    }

    function getText(i: number) {
        return <text
            x={`${i * xStep + PADDING + BAR_WIDTH / 2}`}
            y={`${mainHeight - PADDING / 2}`}
            textAnchor='middle'
        >{`${i}`}</text>
    }

    function getYScale() {
        const x = PADDING / 2
        const half = maxBin / 2
        const yTop = mainHeight - PADDING - maxHeight
        const yMiddle = mainHeight - PADDING - maxHeight / 2
        const yBottom = mainHeight - PADDING

        return <g stroke="rgba(74, 157, 255, .4)">
            <text x={`${x}`} textAnchor='middle'
                y={`${yTop}`}
            >{`${maxBin}`}</text>
            <line x1={`${x}`}
                x2={`${mainWidth - PADDING}`}
                y1={`${yTop} `} y2={`${yTop}`}
            />

            <text x={`${x}`} textAnchor='middle'
                y={`${yMiddle}`}
            >{`${half}`}</text>
            <line x1={`${x}`}
                x2={`${mainWidth - PADDING}`}
                y1={`${yMiddle} `} y2={`${yMiddle}`}
            />

            <text x={`${x}`} textAnchor='middle'
                y={`${yBottom}`}
            >0</text>
            <line x1={`${x}`}
                x2={`${mainWidth - PADDING}`}
                y1={`${yBottom} `} y2={`${yBottom}`}
            />
        </g>
    }

    function getSpline() {
        return <g stroke="rgba(74, 157, 255, .4)">
        </g>
    }

    return <svg
        width={`${mainWidth}`}
        height={`${mainHeight}`}
        textRendering="optimizeLegibility"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="#4A9DFF">
            {getYScale()}
            {getRects()}
            {getSpline()}
        </g>
    </svg>
}

export default HistogramSVG
