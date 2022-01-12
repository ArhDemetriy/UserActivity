import { Histogram } from "../../../controller/Histogram"
import { Retention } from "../../../controller/Retention"

export function calculate() {
    Retention.calcRetention()
    Histogram.calcAll()
}
