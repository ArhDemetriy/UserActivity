import { UserActions } from "../../../redux/actions/UserActions";

let id = 0

const DAY = 24 * 60 * 60 * 1000

export const addUser: React.MouseEventHandler<HTMLButtonElement> = function (event) {
    // UserActions.addUsers([
    //     {
    //         id: id,
    //         registration: new Date(id++ * DAY),
    //         lastActivity: new Date(),
    //     },
    // ])
    UserActions.addUsers(getManyUsers())
}

function getManyUsers(count = 30) {
    const users: Parameters<typeof UserActions['addUsers']>[0] = []

    for (let i = 0; i < count; i++) {
        users.push({
            id: ++id,
            registration: new Date(id * DAY),
            lastActivity: new Date(),
        })
    }

    return users
}


