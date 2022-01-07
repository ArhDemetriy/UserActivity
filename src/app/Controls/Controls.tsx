import React from 'react';
import { Button } from '../../components/button/button';
import './Controls.scss';

export const Controls: React.FC = () => {

    function addUser() {

    }

    return <div className="controls">
        <Button
            requireCssClass='controls-button_add'
            type='button'
        >Add</Button>
        <Button
            requireCssClass='controls-button_save'
            type='submit'
        >Save</Button>
        <Button
            requireCssClass='controls-button_calculate'
            type='button'
        >Calculate</Button>
    </div>
}

export default Controls

