import { Engine } from "../../../controller/Engine"

export function save(callback: () => void) {
    return Engine.trySave()
        .then(() => Engine.tryLoad())
        .catch(e => console.error(e))
        .finally(callback)
}


