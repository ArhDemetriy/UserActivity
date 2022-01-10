import React from 'react';
import './User.scss';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import { IBasicProps } from '../../../types/reactComponents/basic';
import { getDateFromHTML, getHTMLDate } from './dateParser/dateParser';
import { updateUser } from './eventHandlers/updateUser';

interface IUserProps extends IBasicProps{
    index: number
}

export const User: React.FC<IUserProps> = ({ index, requireCssClass }) => {
    const isValid = useSelector((store: TState) => store.users[index]?.isValid)
    const userId = useSelector((store: TState) => store.users[index]?.id)
    const registration = useSelector((store: TState) => getHTMLDate(store.users[index]?.registration))
    const lastActivity = useSelector((store: TState) => getHTMLDate(store.users[index]?.lastActivity))

    const mainClass = requireCssClass + ' user' + (isValid === false ? ' user_invalid' : '')

    return <tr className={mainClass}>
        <td className={'user-item user-item_first'}>
            <input
                value={userId}
                name="userId"
                onChange={event => { updateUser({ id: +event.target.value }, index) }}
                type="number"
                className={'user-item-input user-item-input_clear'}
                size={userId.toString().length + 1}
                />
        </td>
        <td className={'user-item'}>
            <input
                value={registration}
                name="registration"
                onChange={event => { updateUser({ registration: getDateFromHTML(event.target.value) }, index) }}
                type="date"
                className={'user-item-input'}
                />
        </td>
        <td className={'user-item user-item_last'}>
            <input
                value={lastActivity}
                name="lastActivity"
                onChange={event => { updateUser({ lastActivity: getDateFromHTML(event.target.value) }, index) }}
                type="date"
                className={'user-item-input'}
            />
        </td>
    </tr>
}

export default User
