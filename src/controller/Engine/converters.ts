import { ArrayOfUser } from "../../redux/store/reducer/userReducer";
import { TBdUsers } from "../../types/reactComponents/basic";

export function convertToReduxUsers(bdUsers: TBdUsers) {
    return bdUsers.map(bdUser => ({
        ...bdUser,
        registration: new Date(bdUser.registration),
        lastActivity: new Date(bdUser.lastActivity),
    })) as ArrayOfUser
}

export function convertToBdUsers(reduxUsers: ArrayOfUser) {
    const bdUsers: TBdUsers = reduxUsers.map(reduxUser => ({
        id: reduxUser.id,
        registration: reduxUser.registration.getTime(),
        lastActivity: reduxUser.lastActivity.getTime(),
    }))

    return bdUsers
}
