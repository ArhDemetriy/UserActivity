import { createData } from "../../redux/store/reducer/userReducer/createData";
import { TUser } from "../../redux/store/reducer/userReducer/userReducer";
import { TBdUsers } from "../../types/reactComponents/basic";

export function convertToReduxUsers(bdUsers: TBdUsers) {
    const reduxUsers: TUser[] = bdUsers.map(bdUser => ({
        id: createData(bdUser.id, 'valid'),
        registration: createData(new Date(bdUser.registration), 'valid'),
        lastActivity: createData(new Date(bdUser.lastActivity), 'valid'),
    }))

    return reduxUsers
}

export function convertToBdUsers(reduxUsers: TUser[]) {
    const bdUsers: TBdUsers = reduxUsers.map(reduxUser => ({
        id: reduxUser.id.data,
        registration: reduxUser.registration.data.getTime(),
        lastActivity: reduxUser.lastActivity.data.getTime(),
    }))

    return bdUsers
}
