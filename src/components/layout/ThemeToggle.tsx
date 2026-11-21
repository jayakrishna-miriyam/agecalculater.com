import React from 'react';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
export const ThemeToggle: React.FC<{ theme: 'light' | 'dark'; toggleTheme: (event: React.MouseEvent) => void }> = ({ theme, toggleTheme }) => (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
        <Icon name={theme === 'light' ? 'moon' : 'sun'} />
    </Button>
);
