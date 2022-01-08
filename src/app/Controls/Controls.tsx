import React from 'react';
import './Controls.scss';
import './button/button.scss';
import { save } from './EventHandlers/Save';
import { addUser } from './EventHandlers/AddUser';

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
            onClick={save}
        >Save</button>
        <button
            className='controls-button_calculate button'
            type='button'
        >Calculate</button>
    </div>
}

export default Controls
