import React from 'react';
import { footerLinks } from '../../content/index';
import { Icon } from '../ui/Icon';
import { PrivacySettingsLink } from '../privacy/PrivacySettingsLink';

export const Footer: React.FC<{ pathname: string }> = ({ pathname }) => (
    <footer className="site-footer">
        <div className="footer-inner">
            <div className="footer-top">
                <div className="footer-brand">
                    <a href="/" className="brand" aria-label="AgeCalculater.com Homepage">
                        <span className="brand-mark"><Icon name="calendar" /></span>
                        <span>agecalculater<span className="brand-domain">.com</span></span>
                    </a>
                    <p className="footer-description">Calendar age, date differences, and practical explanations.</p>
                    <p className="footer-tagline">Less counting.<br />More clarity.</p>
                </div>
                <nav className="footer-nav" aria-label="Footer">
                    {['Tools', 'Website', 'Legal'].map(group => (
                        <div className="footer-link-group" key={group}>
                            <h2>{group}</h2>
                            <ul>
                                {footerLinks.filter(link => link.group === group).map(link => (
                                    <li key={link.href}>
                                        <a href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
            <PrivacySettingsLink />
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AgeCalculater.com. All rights reserved.</p>
                <p>Made for life's milestones.</p>
            </div>
        </div>
    </footer>
);
