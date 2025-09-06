import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') {
        return 'light';
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }
    // Default to light theme if no preference is stored
    return 'light';
};

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const toggleTheme = useCallback((event: React.MouseEvent) => {
        // @ts-ignore - `startViewTransition` is not in all TS lib versions yet
        const isSupported = document.startViewTransition;

        if (!isSupported) {
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
            return;
        }

        const x = event.clientX;
        const y = event.clientY;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }, []);

    return { theme, toggleTheme };
};