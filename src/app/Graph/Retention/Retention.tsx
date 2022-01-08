import React from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../redux/store/reducer';
import './Retention.scss';

export const Retention: React.FC = () => {
    const users = useSelector((store: TState) => store.users, (left, right) => left.length === right.length)

    return <div
        className="retention"
    >
        {`users: ${users.length}`}
    </div>
}

export default Retention

