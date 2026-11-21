import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost' | 'outline' | 'secondary';
    size?: 'default' | 'icon';
}
export const Button: React.FC<ButtonProps> = ({ className = '', variant = 'default', size = 'default', type = 'button', ...props }) => (
    <button type={type} className={`ui-button ui-button--${variant} ui-button--${size} ${className}`} {...props} />
);
