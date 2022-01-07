import React from 'react';
import { addUser } from './AddUser/AddUser';
import './Controls.scss';
import './button/button.scss';

export const Controls: React.FC = () => {
    return <div
        className="controls"
    >
        <button
            className='controls-button_add button'
            type='button'
            onClick={addUser}
        >Add</button>
        <button
            className='controls-button_save button'
            type='submit'
        >Save</button>
        <button
            className='controls-button_calculate button'
            type='button'
        >Calculate</button>
    </div>
}

export default Controls

