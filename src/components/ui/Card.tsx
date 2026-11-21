import React, { ReactNode } from 'react';
export const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`ui-card ${className}`}>{children}</div>
);
