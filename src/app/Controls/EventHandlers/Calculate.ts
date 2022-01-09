import { Histogram } from "../../../controller/Histogram"
import { Retention } from "../../../controller/Retention"

export const calculate: React.MouseEventHandler<HTMLButtonElement> = function (event) {
    Retention.calcRetention()
    Histogram.calcHistogram()
}
