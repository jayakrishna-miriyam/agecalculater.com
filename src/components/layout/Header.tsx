import React, { useEffect, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from '../ui/Icon';
import { primaryNavLinks, toolDirectory } from '../../content/index';
interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: (event: React.MouseEvent) => void;
    pathname: string;
    onNavigate: (path: string) => void;
}
export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, pathname, onNavigate }) => {
    const headerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDetailsElement>(null);
    const toolsRef = useRef<HTMLDetailsElement>(null);

    const closeMenu = (restoreFocus = false) => {
        if (!menuRef.current?.open) return;
        if (restoreFocus) menuRef.current.querySelector('summary')?.focus();
        menuRef.current.open = false;
        if (toolsRef.current) toolsRef.current.open = false;
    };

    useEffect(() => {
        closeMenu(!!menuRef.current?.contains(document.activeElement));
    }, [pathname]);

    useEffect(() => {
        const onOutsidePress = (event: PointerEvent) => {
            if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenu();
        };
        const desktop = window.matchMedia('(min-width: 1151px)');
        const onResize = () => { if (desktop.matches) closeMenu(); };
        document.addEventListener('pointerdown', onOutsidePress);
        desktop.addEventListener('change', onResize);
        return () => {
            document.removeEventListener('pointerdown', onOutsidePress);
            desktop.removeEventListener('change', onResize);
        };
    }, []);

    const follow = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        closeMenu(true);
        onNavigate(href);
    };
    return (
        <header className="site-header" ref={headerRef} onKeyDown={event => {
            if (event.key === 'Escape' && menuRef.current?.open) {
                event.preventDefault();
                closeMenu(true);
            }
        }} onBlur={event => {
            if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
        }}>
            <div className="header-inner">
                <a className="brand" href="/" aria-label="AgeCalculater.com Homepage" onClick={event => follow(event, '/')}>
                    <span className="brand-mark"><Icon name="calendar" /></span>
                    <span>agecalculater<span className="brand-domain">.com</span></span>
                </a>
                <nav aria-label="Primary" className="primary-nav">
                    {primaryNavLinks.map(link => (
                        <a key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined} onClick={event => follow(event, link.href)}>{link.label}</a>
                    ))}
                </nav>
                <div className="header-theme"><ThemeToggle theme={theme} toggleTheme={toggleTheme} /></div>
                <details className="mobile-menu" ref={menuRef} onToggle={event => {
                    if (!event.currentTarget.open && toolsRef.current) toolsRef.current.open = false;
                }}>
                    <summary role="button" className="mobile-menu-toggle" aria-label="Navigation menu" aria-controls="mobile-navigation">
                        <Icon name="menu" /><Icon name="close" />
                    </summary>
                    <nav id="mobile-navigation" aria-label="Mobile" className="mobile-nav">
                        <a className="mobile-nav-link" href="/" aria-current={pathname === '/' ? 'page' : undefined} onClick={event => follow(event, '/')}>Home<Icon name="arrow" /></a>
                        <details className="mobile-tools" ref={toolsRef}>
                            <summary role="button">All Tools<Icon name="chevron" /></summary>
                            <div className="mobile-tools-list">
                                <a className="mobile-nav-link" href="/all-tools" aria-current={pathname === '/all-tools' ? 'page' : undefined} onClick={event => follow(event, '/all-tools')}>View all tools<Icon name="arrow" /></a>
                                {['Calculators', 'Guides with an age calculator'].map(group => <div key={group} className="mobile-tool-group">
                                    <p>{group === 'Calculators' ? 'Calculators' : 'Specialized age guides'}</p>
                                    {toolDirectory.filter(tool => (tool.group ?? 'Calculators') === group).map(tool => <a key={tool.href} href={tool.href} aria-current={pathname === tool.href ? 'page' : undefined} onClick={event => follow(event, tool.href)}>
                                        <Icon name={tool.href.includes('birthday') ? 'clock' : 'calendar'} /><span>{tool.label}</span>
                                    </a>)}
                                </div>)}
                            </div>
                        </details>
                        <a className="mobile-nav-link" href="/how-to-calculate-age" aria-current={pathname === '/how-to-calculate-age' ? 'page' : undefined} onClick={event => follow(event, '/how-to-calculate-age')}>How to Calculate Age<Icon name="arrow" /></a>
                    </nav>
                </details>
            </div>
        </header>
    );
};
