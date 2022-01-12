import React, { useState } from 'react';
import './Controls.scss';
import './button/button.scss';
import { save } from './EventHandlers/Save';
import { addUser } from './EventHandlers/AddUser';
import { calculate } from './EventHandlers/Calculate';
import { useSelector } from 'react-redux';
import { TState } from '../../redux/store/reducer';

export const Controls: React.FC = () => {
    const usersIsExists = useSelector((store: TState) => store.users?.length > 0)

    const [loading, setLoading] = useState(false)
    const saveButtonClick: React.MouseEventHandler<HTMLButtonElement> = function (event) {
        if (loading) { return }
        setLoading(true)
        save(() => setLoading(false))
    }

    return <div
        className="controls"
    >
        <button
            className='controls-button_add button'
            // disabled={loading}
            type='button'
            onClick={addUser}
        >Add</button>
        <button
            className='controls-button_save button'
            disabled={!usersIsExists}
            type='submit'
            onClick={saveButtonClick}
        >Save</button>
        <button
            className='controls-button_calculate button'
            disabled={!usersIsExists}
            type='button'
            onClick={calculate}
        >Calculate</button>
    </div>
}

export default Controls
