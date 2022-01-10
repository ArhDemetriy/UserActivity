import { getUsers } from "../../../../controller/Engine/getters";
import { UserActions } from "../../../../redux/actions/UserActions";
import { TUser } from "../../../../redux/store/reducer/userReducer";

export function updateUser(newUser: Partial<TUser>, index: number) {
    const user = getUsers()[index]
    if (!user) { return }
    UserActions.updateUser({ ...user, ...newUser }, index)
}
