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
    return {
        id: createData(1, 'needValidate'),
        registration: createData(new Date(), 'needValidate'),
        lastActivity: createData(new Date(), 'needValidate'),
    }
}


