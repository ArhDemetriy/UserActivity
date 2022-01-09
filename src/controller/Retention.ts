import { GraphActions } from "../redux/actions/GraphActions";
import { getUsers } from "./Engine/getters";

export class Retention{

    public static calcRetention() {
        const retention7 = this.getRollingRetention(7)
        if (Number.isFinite(retention7)) { GraphActions.setRetention(retention7) }
    }

    /**
     * @param days Retention interval. int > 0 .
     * особенность формулировки функции в том, что юзер может и регнуться X+n дней назад, и вернуться через X+(m<=n) дней.
     * такие юзеры приближают функцию к 1
     */
    protected static getRollingRetention(days: number) {
        // если вернулся в день когда регнулся, это возврат в 0 день или в 1 ?
        // буду считать что это 0 день

        // что считать началом дня? полночь по гринвичу или в часовом поясе клиента?
        // а может лучше осчитывать интевал от момента регистрации, а не от начала дня регистрации?
        // буду считать что это полночь по гринвичу

        // после округления интервал будет == 0. В результате чего в оба фильтра попадут все пользователи.
        // поменять если из фильтров уберут нестрогие неравентства
        if (days < 1) { return 1 }

        /** запрашиваемый интервал */
        const intervalTime = this.floorTime(this.getIntervalTime(days))

        /** начало сегодняшних суток */
        const now = this.floorTime(Date.now())

        let returns = 0, news = 0

        const users = getUsers()
        for (const user of users) {
            /** начало суток в которых юзер зарегистрировался */
            const registration = this.floorTime(user.registration.getTime())
            // количество пользователей, зарегистрировавшихся в системе X дней назад или раньше
            // это значит что расстояние между округлёнными таймстампами должно быть >= округлённого запрашиваемого интервала
            if (now - registration >= intervalTime) {
                news++
            }

            /** начало суток в которых была последняя активность юзера */
            const lastActivity = this.floorTime(user.lastActivity.getTime())
            // количество пользователей, вернувшихся в систему в X-ый день после регистрации или позже
            // по сути та-же функция что в условии выше. Т.к. в формулировке меняется знак времени
            if (lastActivity - registration >= intervalTime) {
                returns++
            }

            // особенность формулировки функции в том, что юзер может и регнуться X+n дней назад, и вернуться через X+(m<=n) дней.
            // такие юзеры приближают функцию к 1

            // а ещё все "вернувшиеся" так-же попадают в фильтр "новых". Из чего следуется что результат <=1
            // И это позволяет поместить второй if в первый, для чуть большей оптимизации.
            // но меня смущает постановка задачи, потому такую оптимизацию стоит делать после уточнения всех вопросов что тут написал
        }

        // 0 / 0
        if (!news) { return NaN }

        return returns / news
    }

    private static readonly DAY = 24 * 60 * 60 * 1000
    protected static getIntervalTime(days: number) {
        return days * this.DAY
    }
    protected static floorTime(time: number) {
        return time - time % this.DAY
    }

    /**
     * @param days Retention interval. int > 0
     * @deprecated
     */
    protected static getSimpleRollingRetention(days: number) {
        if (days < 1) { return NaN }
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

        if (!news) { return NaN }

        return returns / news
    }
}
