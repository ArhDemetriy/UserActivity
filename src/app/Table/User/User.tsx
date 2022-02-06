import React, { useState } from 'react';
import './User.scss';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import { IBasicProps } from '../../../types/reactComponents/basic';
import { deleteUser, getHTMLDate, getUpdateUserHandler } from './eventHandlers/updateUser';

interface IUserProps extends IBasicProps{
    index: number
}

export const User: React.FC<IUserProps> = ({ index, requireCssClass }) => {
    const reduxId = useSelector((store: TState) => store.users[index]?.id.data)
    const [id, setId] = useState(reduxId)
    const idIsValid = useSelector((store: TState) => store.users[index]?.id.status !== 'invalid')

    const reduxRegistration = useSelector((store: TState) => getHTMLDate(store.users[index]?.registration.data))
    const [registration, setRegistration] = useState(reduxRegistration)
    const registrationIsValid = useSelector((store: TState) => store.users[index]?.registration.status !== 'invalid')

    const reduxLastActivity = useSelector((store: TState) => getHTMLDate(store.users[index]?.lastActivity.data))
    const [lastActivity, setLastActivity] = useState(reduxLastActivity)
    const lastActivityIsValid = useSelector((store: TState) => store.users[index]?.lastActivity.status !== 'invalid')

    if (!id && id !== 0) { return <div /> }

    const mainClass = requireCssClass + ' user'
    return <tr className={mainClass}>
        <td className={'user-item user-item_first'}>
            <input
                value={id}
                name="userId"
                min={0}
                step={1}
                onChange={event => setId(+event.target.value)}
                onBlur={getUpdateUserHandler({
                    key: 'id', index,
                    changeCallback: newValue => { setId(newValue as number) }
                })}
                type="number"
                className={'user-item-input user-item-input_clear' + (idIsValid ? '' : ' user-item-input_invalid')}
                size={id.toString().length + 1}
                />
        </td>
        <td className={'user-item'}>
            <input
                value={registration}
                name="registration"
                max={getHTMLDate(new Date())}
                onChange={event => setRegistration(event.target.value)}
                onBlur={getUpdateUserHandler({
                    key: 'registration', index,
                    changeCallback: newValue => { setRegistration(newValue as string) }
                })}
                type="date"
                className={'user-item-input' + (registrationIsValid ? '' : ' user-item-input_invalid')}
                />
        </td>
        <td className={'user-item'}>
            <input
                value={lastActivity}
                name="lastActivity"
                max={getHTMLDate(new Date())}
                onChange={event => setLastActivity(event.target.value)}
                onBlur={getUpdateUserHandler({
                    key: 'lastActivity', index,
                    changeCallback: newValue => { setLastActivity(newValue as string) }
                })}
                type="date"
                className={'user-item-input' + (lastActivityIsValid ? '' : ' user-item-input_invalid')}
            />
        </td>
        <td className={'user-item user-item_last'}>
            <button
                className={'user-delete_button'}
                type="button"
                onClick={() => { deleteUser(index) }}
            >
                <img src="./img/trash.svg" alt="удалить" />
            </button>
        </td>
    </tr>
}

export default User
