
import React from 'react';

export const Hero: React.FC = () => {
    return (
        <div className="text-center my-8 md:my-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                The Ultimate Age Calculator
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
                Instantly find your age in years, months, days, and even seconds with our fast and accurate tool.
            </p>
        </div>
    );
};