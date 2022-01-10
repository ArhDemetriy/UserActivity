import { UserActions } from "../redux/actions/UserActions"
import { getUsers } from "./Engine/getters"

export class Validate {
    public static validate() {
        // const users = getUsers()
        const idValidate = this.validateAllIds()

        return idValidate
    }

    /**
     * Проверка уникальности id всех юзеров.
     * Обновляет редакс при необходимости.
     * O(2n) + обновление редакса.
     */
    public static validateAllIds() {
        const users = getUsers()

        const tester: { [k in number]: { count: number, indexes: number[], } } = {}

        let allValid = true
        users.forEach((user, index) => {
            const id = user.id
            if (tester[id]?.count) {
                tester[id] = {
                    count: 1,
                    indexes: [index],
                }
            } else {
                tester[id].indexes.push(index)
                tester[id].count = tester[id].indexes.length
                allValid = false
            }
        })

        let needUpdate = false
        const validateUsers = users.map(user => {
            const count = tester[user.id]?.count
            const isValid = !count || count === 1

            if (user.isValid !== isValid) {
                needUpdate = true
                return {
                    ...user,
                    isValid
                }
            }

            return user
        })

        if (needUpdate) {
            UserActions.replaceUsers(validateUsers)
        }

        return allValid
    }

    public static validateUserId(from: number) {
        const users = getUsers()
        const id = users[from]?.id
        if (!Number.isFinite(id)) { return false }

        let isValid = users.every((user, i) => id !== user.id || from === i)

        if (users[from].isValid !== isValid) {
            users[from].isValid = isValid
            UserActions.updateUser(users[from], from)
        }

        return isValid
     }

    /**
     * проверяет даты всех пользователей, вызывая индивидуальную проверку для каждого.
     * часто дёргает редакс.
     */
    public static validateAllDate() {
        let allValid = true
        const users = getUsers()
        users.forEach((_, i) => { allValid = this.validateUserDate(i) && allValid })
        return allValid
    }
    public static validateUserDate(from: number) {
        const user = getUsers()[from]

        let isValid = true
        if (!user?.registration?.getTime || !user.lastActivity?.getTime) { isValid = false }
        if (user.lastActivity.getTime() > Date.now()) { isValid = false }
        if (user.registration.getTime() > user.lastActivity.getTime()) { isValid = false }

        if (user.isValid !== isValid) {
            user.isValid = isValid
            UserActions.updateUser(user, from)
        }

        return isValid
    }
}
