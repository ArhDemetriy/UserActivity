import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../redux/store/reducer';
import './Table.scss';

export const Table: React.FC = () => {
    const users = useSelector((store: TState) => store.users)

    function getTBody() {
        return <tbody>{
            users.map(user => <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.registration.toLocaleDateString()}</td>
                <td>{user.lastActivity.toLocaleDateString()}</td>
            </tr>)
        }</tbody>
    }

    return <div className="table">
        <table>
            <caption>Users activity</caption>
            <thead>
                <tr>
                    <th scope="col">UserID</th>
                    <th scope="col">Date Registration</th>
                    <th scope="col">Date Last Activity</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            {getTBody()}
        </table>
    </div>
}

export default Table

