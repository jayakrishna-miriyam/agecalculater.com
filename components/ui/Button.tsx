import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost' | 'outline' | 'secondary';
    size?: 'default' | 'icon';
}

const variants = {
    default: 'bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-700',
    outline: 'border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
};

const sizes = {
    default: 'px-4 py-2',
    icon: 'h-9 w-9',
};

export const Button: React.FC<ButtonProps> = ({ className, variant = 'default', size = 'default', ...props }) => {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        />
    );
};