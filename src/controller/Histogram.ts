import { GraphActions } from "../redux/actions/GraphActions";
import { getUsers } from "./Engine/getters";

export class Histogram{
    public static calcHistogram() {
        const rawBins = this.getBinLifeTimes()

        const maxBin = Math.max(...rawBins)
        const bins = this.normTo1(rawBins, maxBin)

        GraphActions.replaceHistogram({ bins, maxBin })
    }

    protected static getBinLifeTimes() {
        // const lifeTimes = this.getLifeTimes()
        const lifeTimes = this.getDebugBins(300, 50 * this.DAY)

        /** массив столбцов гистограмы */
        const bins: number[] = (new Array(lifeTimes.length)).fill(0)
        let maxI = 0
        for (const lifeTime of lifeTimes) {
            const i = Math.floor(lifeTime / this.DAY)
            bins[i] += 1
            if (i > maxI) { maxI = i }
        }

        return bins.slice(0, maxI + 1)
    }

    /** @returns массив времён жизни всех пользователей */
    protected static getLifeTimes() {
        const users = getUsers()
        return users
        .map(user => user.lastActivity.getTime() - user.registration.getTime())
    }

    private static readonly DAY = 24 * 60 * 60 * 1000

    protected static normTo1(raw: number[], max?: number) {
        const k = max || Math.max(...raw)
        if (!k) { return raw }
        return raw.map(n => n / k)
    }

    protected static getDebugBins(count: number, maxValue: number) {
        const bins: number[] = []
        for (let i = 0; i < count; i++) {
            bins.push(Math.round(Math.random() * maxValue))
        }
        return bins
    }
}
