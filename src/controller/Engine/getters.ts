import { store } from "../../redux/store";
import { convertToBdUsers } from "./converters";

export function getUsers() {
    return store.getState().users
}
