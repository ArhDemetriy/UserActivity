import React, { useState } from 'react';
import './Controls.scss';
import './button/button.scss';
import { save } from './EventHandlers/Save';
import { addUser } from './EventHandlers/AddUser';
import { calculate } from './EventHandlers/Calculate';

export const Controls: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const saveButtonClick: React.MouseEventHandler<HTMLButtonElement> = function (event) {
        setLoading(true)
        save().finally(() => setLoading(false))
    }

    return <div
        className="controls"
    >
        <button
            className='controls-button_add button'
            disabled={loading}
            type='button'
            onClick={addUser}
        >Add</button>
        <button
            className='controls-button_save button'
            disabled={loading}
            type='submit'
            onClick={saveButtonClick}
        >Save</button>
        <button
            className='controls-button_calculate button'
            disabled={loading}
            type='button'
            onClick={calculate}
        >Calculate</button>
    </div>
}

export default Controls
