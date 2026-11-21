import React from 'react';
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className = '', ...props }) => (
    <label className={`ui-label ${className}`} {...props} />
);
