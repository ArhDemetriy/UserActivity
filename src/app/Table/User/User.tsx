import React from 'react';
import './User.scss';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import { IBasicProps } from '../../../types/reactComponents/basic';

interface IUserProps extends IBasicProps{
    index: number
}

export const User: React.FC<IUserProps> = ({ index, requireCssClass }) => {
    const user = useSelector(
        (store: TState) => store.users[index],
        // (left, right) => {
        //     // юзеры совпадают когда у них совпадают все поля.
        //     if (!left !== !right) { return false }
        //     if (!(left && right)) { return true }
        //     return left.id === right.id
        //         && left.lastActivity === right.lastActivity
        //         && left.registration === right.registration
        // }
    )

    if (!user) { return null }

    return <tr className={requireCssClass + ' user'}>
        <td className={'user-item user-item_first'}>{user.id}</td>
        <td className={'user-item'}>{user.registration.toLocaleDateString()}</td>
        <td className={'user-item user-item_last'}>{user.lastActivity.toLocaleDateString()}</td>
    </tr>
}

export default User

