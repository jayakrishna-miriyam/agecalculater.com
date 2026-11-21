import React from 'react';
type IconName = 'calendar' | 'arrow' | 'clock' | 'shield' | 'spark' | 'sun' | 'moon' | 'share' | 'chevron' | 'menu' | 'close' | 'whatsapp' | 'mail';
const paths: Record<IconName, React.ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
    whatsapp: <path transform="scale(.75)" fill="currentColor" stroke="none" d="M16 .667C7.6.667.667 7.6.667 16c0 2.83.74 5.56 2.13 7.96L0 32l8.3-2.77A15.24 15.24 0 0016 31.333c8.4 0 15.333-6.933 15.333-15.333S24.4.667 16 .667zm0 27.466a12.04 12.04 0 01-6.13-1.71l-.44-.26-4.92 1.64 1.63-4.8-.29-.5a11.87 11.87 0 01-1.73-6.2c0-6.56 5.34-11.9 11.9-11.9 6.56 0 11.9 5.34 11.9 11.9 0 6.56-5.34 11.9-11.9 11.9zm6.57-8.9c-.36-.18-2.13-1.05-2.46-1.18-.33-.12-.57-.18-.81.18-.24.36-.93 1.18-1.14 1.42-.21.24-.42.27-.78.09-.36-.18-1.51-.56-2.88-1.78-1.06-.94-1.77-2.1-1.98-2.46-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.72-.6-.62-.81-.63-.21-.01-.45-.01-.69-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .01 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.9 6.15 5.46.86.37 1.52.59 2.04.75.86.27 1.64.23 2.25.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="4" /><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2m-8 3h2" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z" />,
    share: <><path d="M12 16V3m-4 4 4-4 4 4M5 12v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6" /></>,
    chevron: <path d="m9 5 7 7-7 7" />,
};
export const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className = '' }) => (
    <svg className={`ui-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
);
