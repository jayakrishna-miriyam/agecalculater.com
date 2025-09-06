import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={`flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );
});

Input.displayName = 'Input';
