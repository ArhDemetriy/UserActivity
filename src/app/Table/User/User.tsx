import React from 'react';
import './User.scss';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import { IBasicProps } from '../../../types/reactComponents/basic';
import { getDateFromHTML, getHTMLDate } from './dateParser/dateParser';
import { updateUser } from './eventHandlers/updateUser';
import { createData } from '../../../redux/store/reducer/userReducer/createData';

interface IUserProps extends IBasicProps{
    index: number
}

export const User: React.FC<IUserProps> = ({ index, requireCssClass }) => {
    const id = useSelector((store: TState) => store.users[index]?.id.data)
    const idIsValid = useSelector((store: TState) => store.users[index]?.id.status !== 'invalid')

    const registration = useSelector((store: TState) => getHTMLDate(store.users[index]?.registration.data))
    const registrationIsValid = useSelector((store: TState) => store.users[index]?.registration.status !== 'invalid')

    const lastActivity = useSelector((store: TState) => getHTMLDate(store.users[index]?.lastActivity.data))
    const lastActivityIsValid = useSelector((store: TState) => store.users[index]?.lastActivity.status !== 'invalid')

    if (!id && id !== 0) { return <div /> }

    const mainClass = requireCssClass + ' user'// + (isValid === false ? ' user_invalid' : '')

    return <tr className={mainClass}>
        <td className={'user-item user-item_first'}>
            <input
                value={id}
                name="userId"
                min={0}
                step={1}
                onChange={event => { updateUser({ id: createData(+event.target.value, 'needValidate') }, index) }}
                type="number"
                className={'user-item-input user-item-input_clear' + (idIsValid ? '' : ' user-item-input_invalid')}
                size={id.toString().length + 1}
                />
        </td>
        <td className={'user-item'}>
            <input
                value={registration}
                max={getHTMLDate(new Date())}
                name="registration"
                onChange={event => {
                    updateUser({ registration: createData(getDateFromHTML(event.target.value), 'needValidate') }, index)
                }}
                type="date"
                className={'user-item-input' + (registrationIsValid ? '' : ' user-item-input_invalid')}
                />
        </td>
        <td className={'user-item user-item_last'}>
            <input
                value={lastActivity}
                name="lastActivity"
                onChange={event => { updateUser({ lastActivity: createData(getDateFromHTML(event.target.value), 'needValidate') }, index) }}
                type="date"
                className={'user-item-input' + (lastActivityIsValid ? '' : ' user-item-input_invalid')}
            />
        </td>
    </tr>
}

export default User
