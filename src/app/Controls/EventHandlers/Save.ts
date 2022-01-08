import { Engine } from "../../../controller/Engine"

export function save() {
    return Engine.trySave()
        .then(() => Engine.tryLoad())
        .catch(e => console.error(e))
}


