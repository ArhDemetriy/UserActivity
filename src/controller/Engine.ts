import { getUsersForBd } from "./Engine/getters";

export class Engine{
    public static validate() {
        return true
    }

    public static trySave() {
        if (!this.validate()) { return }

        const users = getUsersForBd()
    }
}
