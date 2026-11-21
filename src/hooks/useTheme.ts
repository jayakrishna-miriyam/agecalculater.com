import { useState, useEffect, useCallback } from 'react';
type Theme = 'light' | 'dark';
export const useTheme = () => {
    // Match the server initially, then adopt the theme set before the page paints.
    const [theme, setTheme] = useState<Theme>('light');
    useEffect(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }, []);
    const toggleTheme = useCallback(() => {
        const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', next === 'dark');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#191e2b' : '#e9e8e2');
        try { localStorage.setItem('theme', next); } catch { /* Storage is optional. */ }
        setTheme(next);
    }, []);
    return { theme, toggleTheme };
};
