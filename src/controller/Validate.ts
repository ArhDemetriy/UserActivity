import { UserActions } from "../redux/actions/UserActions"
import { getUsers } from "./Engine/getters"

export class Validate {
    public static validate() {
        // const users = getUsers()
        const idValidate = this.validateAllIds()

        return idValidate
    }

    public static validateAllIds() {
        const users = getUsers()

        const tester: { [k in number]: number } = {}
        users.forEach(user => tester[user.id] = user.id + (tester[user.id] || 0))

        let needUpdate = false
        let allValid = true
        users.forEach((user, i) => {
            const isValid = !!(tester[user.id] && tester[user.id] > 1)
            allValid = allValid && isValid
            if (users[i].isValid !== isValid) {
                users[i].isValid = isValid
                needUpdate = true
            }
        })

        if (needUpdate) {
            UserActions.replaceUsers(users.concat())
        }

        return allValid
    }
}
