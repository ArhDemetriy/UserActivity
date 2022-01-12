import { store } from "../../redux/store";

export function getUsers() {
    return store.getState().users
}

export function getHistogram() {
    return store.getState().graph?.histogram
}
