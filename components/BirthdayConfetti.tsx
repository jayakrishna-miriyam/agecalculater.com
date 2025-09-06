import React from 'react';

// A simple component to render a number of confetti pieces.
// The animation is handled by CSS defined in index.html.
export const BirthdayConfetti: React.FC = () => {
    // Create an array of 50 confetti pieces for a dense effect
    const confettiCount = 50;
    const confetti = Array.from({ length: confettiCount }).map((_, index) => {
        const style = {
            left: `${Math.random() * 100}%`, // Random horizontal position
            animationDuration: `${Math.random() * 3 + 2}s`, // Random duration between 2-5s
            animationDelay: `${Math.random() * 2}s`, // Random delay up to 2s
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`, // Random color
        };
        return <div key={index} className="confetti-piece" style={style}></div>;
    });

    return <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">{confetti}</div>;
};
