import { GraphActions } from "../redux/actions/GraphActions";
import { getHistogram, getUsers } from "./Engine/getters";

export class Histogram{

    public static calcAll() {
        this.calcMetrics()
        setTimeout(this.calcHistogram.bind(this), 0)
        setTimeout(this.calcSpline.bind(this), 0)
    }

    // Histogram

    public static calcHistogram() {
        const rawBins = this.getBinLifeTimes()

        const maxBin = Math.max(...rawBins)
        const bins = this.normTo1(rawBins, maxBin)

        GraphActions.replaceHistogram({ bins, maxBin })
    }

    protected static getBinLifeTimes() {
        const lives = this.getLifeDays().map(d => Math.round(d))
        const biggestLife = Math.max(...lives)

        /** массив столбцов гистограмы */
        const bins: number[] = (new Array(biggestLife + 1)).fill(0)
        for (const life of lives) {
            bins[life] += 1
        }

        return bins
    }

    protected static normTo1(raw: number[], max?: number) {
        const k = max || Math.max(...raw)
        if (!k) { return raw }
        return raw.map(n => n / k)
    }

    /** @returns массив времён жизни всех пользователей */
    protected static getLifeDays() {
        const DAY = 24 * 60 * 60 * 1000
        const users = getUsers()
        return users
            .map(user => (user.lastActivity.data.getTime() - user.registration.data.getTime()) / DAY)
    }

    // Metrics

    protected static calcMetrics() {
        const lifeDays = this.getLifeDays().sort((a, b) => a - b)

        const result = {
            average: this.getAverage(lifeDays),
            median: this.getMedian(lifeDays),
            percentile10: this.getPercentile(lifeDays, 10),
            percentile90: this.getPercentile(lifeDays, 90),
        }

        GraphActions.replaceMetrics(result)
    }

    protected static getAverage(lifeTimes: number[]) {
        const sum = lifeTimes.reduce((p, c) => p + c, 0)
        const average = sum / lifeTimes.length
        return average
    }

    /** @param sortedLifeTimes: sorted number[] */
    protected static getMedian(sortedLifeTimes: number[]) {
        if (sortedLifeTimes.length % 2 > 0) {
            return sortedLifeTimes[Math.floor(sortedLifeTimes.length / 2)]
        } else {
            // length / 2 указывает на последний в паре элемент. Потому берём его и i-1
            const i = Math.round(sortedLifeTimes.length / 2)
            return 0.5 * (sortedLifeTimes[i - 1] + sortedLifeTimes[i])
        }
    }

    /**
     * @param sortedLifeTimes: sorted number[]
     * @param percent: [0..100] request Percentile
    */
    protected static getPercentile(sortedLifeTimes: number[], percent: number) {
        const percentIndex = (sortedLifeTimes.length - 1) * (percent / 100)
        if (percentIndex === Math.floor(percentIndex)) { return sortedLifeTimes[percentIndex] }

        const min = sortedLifeTimes[Math.floor(percentIndex)]
        const max = sortedLifeTimes[Math.ceil(percentIndex)]

        const delta = (max - min)
        const k = percentIndex - Math.floor(percentIndex)

        return min + delta * k
    }

    // Spline

    protected static calcSpline() {
        const histogram = getHistogram()
        if (!histogram?.bins?.length) { return }

        const bins = histogram.bins
        const points: number[] = []

        for (let i = 0; i < bins.length - 1; i++) {
            points.push(bins[i])
            // среднее между соседними точками
            points.push((bins[i] + bins[i + 1]) / 2)
        }
        points.push(bins[bins.length - 1])

        GraphActions.replaceSpline(points)
    }
}
