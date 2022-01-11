import { UserActions } from "../redux/actions/UserActions"
import { TData, TUser } from "../redux/store/reducer/userReducer/userReducer"
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

            if (this.updateValidStatusIn(user, {
                id: { status: isValid ? 'valid' : 'invalid' },
            })) {
                needUpdate = true
                // пересоздание для обновления хука в User.tsx
                return { ...user }
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
        const user = users[from]
        if (!user?.id) { return false }
        const id = user.id.data

        let isValid = true
        if (!Number.isFinite(id)) {
            isValid = false
        } else {
            isValid = users.every((user, i) => id !== user.id.data || from === i)
        }

        if (this.updateValidStatusIn(user, {
            id: { status: isValid ? 'valid' : 'invalid' },
        })) {
            UserActions.updateUser(user, from)
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
        if (!user?.registration || !user.lastActivity) { return false }

        const lastActivityIsValid =  user.lastActivity?.data?.getTime
                                    && user.lastActivity.data.getTime() < Date.now()

        let registrationIsValid = !!user.registration?.data?.getTime
        if (lastActivityIsValid) {
            registrationIsValid = registrationIsValid && user.registration.data.getTime() < user.lastActivity.data.getTime()
        } else {
            registrationIsValid = registrationIsValid && user.registration.data.getTime() < Date.now()
        }

        if (this.updateValidStatusIn(user, {
            lastActivity: { status: lastActivityIsValid ? 'valid' : 'invalid' },
            registration: { status: registrationIsValid ? 'valid' : 'invalid' },
        })) {
            UserActions.updateUser(user, from)
        }

        return lastActivityIsValid && registrationIsValid
    }

    /** мутирует статусы в переданном объекте.
     * @param mutableUser объект в котором, при необходимости, мутируются статусы
     * @param status объект со статусами которые должны быть в mutableUser
     * @returns были-ли изменены статусы
     */
    protected static updateValidStatusIn<T extends Record<string, Pick<TData<any>, 'status'>>>(mutableUser: T, status: Partial<Record<keyof T, Pick<TData<any>, 'status'>>>) {
        let needUpdate = false

        for (const key of Object.keys(status)) {
            if (mutableUser[key as keyof TUser].status !== status[key as keyof TUser]!.status) {
                mutableUser[key as keyof TUser].status = status[key as keyof TUser]!.status
                needUpdate = true
            }
        }

        return needUpdate
    }
}
