import React from 'react';
import { Button } from './ui/Button';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    toggleTheme: (event: React.MouseEvent) => void;
}

const SunIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
    >
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.591a.75.75 0 11-1.06-1.06l1.591-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.836 17.836a.75.75 0 01-1.06 0l-1.591-1.591a.75.75 0 011.06-1.06l1.591 1.591a.75.75 0 010 1.06zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V21a.75.75 0 01-.75-.75zM5.106 17.836a.75.75 0 010-1.06l1.591-1.591a.75.75 0 011.06 1.06l-1.591 1.591a.75.75 0 01-1.06 0zM4.5 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM6.106 6.106a.75.75 0 011.06 0l1.591 1.591a.75.75 0 01-1.06 1.06L6.106 7.167a.75.75 0 010-1.06z" />
    </svg>
);

const MoonIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M7.455 1.755a.75.75 0 01.838.206 9.001 9.001 0 0010.966 10.966.75.75 0 01.206.838A10.502 10.502 0 019.5 20.5 10.5 10.5 0 011.755 7.455a10.502 10.502 0 015.7-5.7z" clipRule="evenodd" />
    </svg>
);


export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="relative h-9 w-9 overflow-hidden text-slate-600 dark:text-slate-400"
        >
            {/* Sun Icon */}
            <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-100 transform 
                ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
            >
                <SunIcon />
            </span>
            {/* Moon Icon */}
            <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-100 transform 
                ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
            >
                <MoonIcon />
            </span>
        </Button>
    );
};