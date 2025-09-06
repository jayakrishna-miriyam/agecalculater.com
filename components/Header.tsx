import React from 'react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: (event: React.MouseEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href="/" aria-label="AgeCalculater.com Homepage">
                    <img src="./assets/age-calculater-logo-black.png" alt="AgeCalculater.com Black color Logo" className="h-12 block dark:hidden" />
                    <img src="./assets/age-calculater-logo-white.png" alt="AgeCalculater.com White color Logo" className="h-12 hidden dark:block" />
                </a>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </header>
    );
};
