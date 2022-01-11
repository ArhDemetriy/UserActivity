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
     */
    public static validateAllIds(force = true) {
        const users = getUsers()

        /** { [id] : ArrayOfIndexes } */
        const tester: { [k in number]: number[] } = {}

        // загоняем в tester количество вхождений каждого id.
        let allValid = true
        users.forEach((user, index) => {
            if (user.id.status === 'loading') { return }

            const id = user.id.data
            if (!tester[id]?.length) {
                tester[id] =  [index]
            } else {
                tester[id].push(index)
                allValid = false
            }
        })

        const invalidIndexes = new Set(([] as number[])
            .concat(...Object.values(tester)
                .filter(indexes => indexes.length > 1)))

        // проставление статусов
        let needUpdate = false
        const validateUsers = users.map(user => {
            if (!force && user.id.status === 'valid') { return user }
            if (user.id.status === 'loading') { return user }

            const isValid = !invalidIndexes.has(user.id.data)

            const result = { ...user }

            if (isValid) {
                if (user.id.status !== 'valid') {
                    needUpdate = true
                    result.id.status = 'valid'
                    return result
                }
            } else {
                if (user.id.status !== 'invalid') {
                    needUpdate = true
                    result.id.status = 'invalid'
                    return result
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
