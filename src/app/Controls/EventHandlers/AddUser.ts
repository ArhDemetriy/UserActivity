import { getUsers } from "../../../controller/Engine/getters";
import { UserActions } from "../../../redux/actions/UserActions";
import { createData } from "../../../redux/store/reducer/userReducer/createData";
import { TUser } from "../../../redux/store/reducer/userReducer/userReducer";

export function addUser() {
    const reduxUsers = getUsers()
    if (!Array.isArray(reduxUsers) || !reduxUsers.length) {
        UserActions.addUsers([getDefaultUser()])
        return
    }

    const lastId = reduxUsers[reduxUsers.length - 1].id.data
    const newUser = getDefaultUser()
    newUser.id.data = lastId + 1
    UserActions.addUsers([newUser])
}

function getDefaultUser(): TUser {
    const result = {
        id: createData(1, 'needValidate'),
        registration: createData(new Date(0), 'needValidate'),
        lastActivity: createData(new Date(0), 'needValidate'),
    }

    const now = new Date()
    result.registration.data.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())
    result.lastActivity.data.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())

    return result
}


