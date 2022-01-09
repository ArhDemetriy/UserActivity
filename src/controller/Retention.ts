import { GraphActions } from "../redux/actions/GraphActions";
import { getUsers } from "./Engine/getters";

export class Retention{

    public static calcRetention() {
        GraphActions.setRetention(this.getRetention(7) || 0)
    }

    /**
     * @param days Retention interval. int > 0
     */
    protected static getRetention(days: number) {
        if (days < 1) { return }
        const intervalTime = this.getIntervalTime(days)
        const users = getUsers()

        let returns = 0, news = 0
        const now = Date.now()

        for (const user of users) {
            const registration = user.registration.getTime()
            if (now - registration <= intervalTime) {
                news++
            } else if (user.lastActivity.getTime() - registration >= intervalTime) {
                returns++
            }
        }

        if (!news) { return }

        return returns / news
    }

    private static readonly DAY = 24 * 60 * 60 * 1000

    protected static getIntervalTime(days: number) {
        return days * this.DAY
    }
}
