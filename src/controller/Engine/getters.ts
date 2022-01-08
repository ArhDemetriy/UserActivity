import { store } from "../../redux/store";

export function getUsers() {
    return store.getState().users
}
