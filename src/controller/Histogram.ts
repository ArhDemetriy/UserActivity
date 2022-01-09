import { GraphActions } from "../redux/actions/GraphActions";
import { getUsers } from "./Engine/getters";

export class Histogram{
    public static calcHistogram() {
        const bins = this.getBinLifeTimes()
        GraphActions.replaceHistogram(bins)
    }

    protected static getBinLifeTimes() {
        const lifeTimes = this.getLifeTimes()

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
}
