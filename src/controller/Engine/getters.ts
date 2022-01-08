import { store } from "../../redux/store";
import { convertToBdUsers } from "./converters";

export function getUsersForBd() {
    return convertToBdUsers(store.getState().users)
}
