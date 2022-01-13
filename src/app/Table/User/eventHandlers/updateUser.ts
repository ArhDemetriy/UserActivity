import { getUsers } from "../../../../controller/Engine/getters";
import { Validate } from "../../../../controller/Validate";
import { UserActions } from "../../../../redux/actions/UserActions";
import { createData } from "../../../../redux/store/reducer/userReducer/createData";
import { TUser } from "../../../../redux/store/reducer/userReducer/userReducer";

export function updateUser(newUser: Partial<TUser>, index: number) {
    const user = getUsers()[index]
    if (!user) { return }
    UserActions.updateUser({ ...user, ...newUser }, index)
}

export function deleteUser(index: number) {
    UserActions.deleteUser(index)
}

type getUpdateUserHandlerParams<K extends keyof TUser> = {
    /** номер юзера которого нужно обновлять */
    index: number,
    /** ключ TUser для которого нужно сгенерировать хандлер */
    key: K,
    /** вызывается после обновления юзера */
    changeCallback: (newValue: string | number) => void
}

/**
 * возвращает хандлер адаптированный под переданный ключ TUser.
 * Если из эвента пришли валидные данные, обновляет юзера по указанному индексу.
 * Если передать callback, вызовет его после обновления юзера
 */
export function getUpdateUserHandler<K extends keyof TUser>(p: getUpdateUserHandlerParams<K>): React.FocusEventHandler<HTMLInputElement> {
    let converter: (value: string) => TUser[K]['data'] | null
    let validator: (index: number) => void
    let reverseConverter: (value: TUser[K]['data']) => string | number

    if (p.key === 'id') {
        converter = getNumber
        validator = Validate.validateUserId.bind(Validate)
        reverseConverter = value => value as number
    } else if (p.key === 'lastActivity' || p.key === 'registration') {
        converter = getDateFromHTML
        validator = Validate.validateUserDate.bind(Validate)
        reverseConverter = getHTMLDate as typeof reverseConverter
    }

    const index = p.index, key = p.key, changeCallback = p.changeCallback

    return function (event) {
        const value = converter(event.target.value)
        if (value === null) { return }
        UserActions.updateUser({ [key]: createData(value, 'valid') }, index)
        validator(index)
        // синхронизация состояний. На случай если появятся промежуточные обработчики
        const user = getUsers()[index]
        changeCallback(reverseConverter(user[key].data))
    }
}

/** возвращает null при ошибках */
export function getDateFromHTML(date: string) {
    if (!date?.split) { return null }
    const dateValues = date.trim().split('-').map(value => parseInt(value))
    if (dateValues.length < 3 || !dateValues.every(value => Number.isFinite(value) && value >= 0)) { return null }

    const newDate = new Date(0)
    newDate.setFullYear(dateValues[0], dateValues[1] - 1, dateValues[2])

    return newDate
}

function getNumber(value: string) { return +value }

export function getHTMLDate(date: Date) {
    if (!date?.getFullYear) { return '' }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}
