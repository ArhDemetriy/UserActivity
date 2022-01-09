import React, { useState } from 'react';
import './User.scss';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import { IBasicProps } from '../../../types/reactComponents/basic';
import { getHTMLDate } from './dateParser/dateParser';

interface IUserProps extends IBasicProps{
    index: number
}

export const User: React.FC<IUserProps> = ({ index, requireCssClass }) => {
    const user = useSelector((store: TState) => store.users[index])
    const isValid = useSelector((store: TState) => store.users[index].isValid)

    const [userId, setUserId] = useState(user.id)
    const [registration, setRegistration] = useState(getHTMLDate(user.registration))
    const [lastActivity, setLastActivity] = useState(getHTMLDate(user.lastActivity))

    if (!user) { return null }

    const mainClass = requireCssClass + ' user' + (isValid === false ? ' user_invalid' : '')

    return <tr className={mainClass}>
        <td className={'user-item user-item_first'}>
            <input
                value={userId}
                name="userId"
                onChange={event => setUserId(+event.target.value)}
                type="number"
                className={'user-item-input user-item-input_clear'}
                size={userId.toString().length + 1}
            />
        </td>
        <td className={'user-item'}>
            <input
                value={registration}
                name="registration"
                onChange={event => setRegistration(event.target.value)}
                type="date"
                className={'user-item-input'}
            />
        </td>
        <td className={'user-item user-item_last'}>
            <input
                value={lastActivity}
                name="lastActivity"
                onChange={event => setLastActivity(event.target.value)}
                type="date"
                className={'user-item-input'}
            />
        </td>
    </tr>
}

export default User
