import { store } from "../../redux/store";

export function getUsersForBd() {
    return store.getState().users
        .map(user => ({
            id: user.id,
            registration: user.registration.getTime(),
            lastActivity: user.lastActivity.getTime(),
        }))
}
