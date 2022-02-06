import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../redux/store/reducer';
import './Table.scss';
import { User } from './User/User';

export const Table: React.FC = () => {
    const users = useSelector((store: TState) => store.users)

    return <table className="table">
        <caption className="table-caption">Users activity</caption>
        <thead className="table-head">
            <tr>
                <th className="table-head-item" scope="col">UserID</th>
                <th className="table-head-item" scope="col">Date Registration</th>
                <th className="table-head-item" scope="col">Date Last Activity</th>
            </tr>
        </thead>
        <tbody className={"table-body"}>{
            users.map((user, index) => <User
                requireCssClass='table-body-item'
                index={index}
                key={`table-${index}-${user.id}`}
            />)
        }</tbody>
    </table>
}

export default Table

