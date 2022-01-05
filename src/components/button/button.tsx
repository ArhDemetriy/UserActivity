import React from 'react';
import { IBasicProps } from '../../types/reactComponents/basic';
import './button.scss';

interface ButtonProps extends IBasicProps{
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const Button: React.FC<ButtonProps> = ({ requireCssClass, children, type }) => {
    const mainClass = requireCssClass + " button"

    return <button
        className={mainClass}
        type={type || 'button'}
    >{children}</button>
}

export default Button;
