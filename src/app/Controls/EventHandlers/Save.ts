import { Engine } from "../../../controller/Engine"

export const save: React.MouseEventHandler<HTMLButtonElement> = function (event) {
    Engine.trySave()
}


