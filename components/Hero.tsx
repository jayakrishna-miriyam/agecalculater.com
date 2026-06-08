import React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <div className="my-8 text-center md:my-14">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
                {subtitle}
            </p>
        </div>
    );
};
