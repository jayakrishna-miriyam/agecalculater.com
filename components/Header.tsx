import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { primaryNavLinks } from '../siteContent';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: (event: React.MouseEvent) => void;
    pathname: string;
    onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, pathname, onNavigate }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="container mx-auto flex flex-col gap-3 px-4 py-3 md:h-20 md:flex-row md:items-center md:justify-between">
                <a
                    href="/"
                    aria-label="AgeCalculater.com Homepage"
                    onClick={(event) => {
                        event.preventDefault();
                        onNavigate('/');
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/miryam/image/upload/f_auto,q_auto,w_240/v1757368189/agecalculater.com/assets/age-calculater-logo-black_webP.webp"
                        alt="AgeCalculater.com Logo"
                        className="block h-12 w-auto dark:hidden"
                        width="240"
                        height="110"
                        fetchPriority="high"
                        decoding="async"
                    />
                    <img
                        src="https://res.cloudinary.com/miryam/image/upload/f_auto,q_auto,w_240/v1757368190/agecalculater.com/assets/age-calculater-logo-white_webP.webp"
                        alt="AgeCalculater.com Logo"
                        className="hidden h-12 w-auto dark:block"
                        width="240"
                        height="110"
                        fetchPriority="high"
                        decoding="async"
                    />
                </a>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                        {primaryNavLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onNavigate(link.href);
                                    }}
                                    className={`transition-colors ${
                                        isActive
                                            ? 'text-sky-600 dark:text-sky-300'
                                            : 'text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </nav>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </header>
    );
};
