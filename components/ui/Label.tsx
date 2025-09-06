
import React, { ReactNode } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
    return (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
            {children}
        </label>
    );
};