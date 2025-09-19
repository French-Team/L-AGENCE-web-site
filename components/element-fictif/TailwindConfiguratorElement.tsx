
import React, { useState, useEffect } from 'react';

const themes = [
    {
        name: 'Cool Dark',
        bg: 'bg-gray-800/50',
        cardBg: 'bg-gray-900/50',
        text: 'text-gray-200',
        textMuted: 'text-gray-400',
        primary: 'bg-indigo-500',
        primaryText: 'text-white',
        accent: 'bg-sky-500',
    },
    {
        name: 'Warm Light',
        bg: 'bg-rose-50',
        cardBg: 'bg-white/80',
        text: 'text-gray-800',
        textMuted: 'text-gray-500',
        primary: 'bg-rose-500',
        primaryText: 'text-white',
        accent: 'bg-amber-500',
    },
    {
        name: 'Nature Vibe',
        bg: 'bg-emerald-900/30',
        cardBg: 'bg-emerald-950/50',
        text: 'text-lime-100',
        textMuted: 'text-lime-300/70',
        primary: 'bg-emerald-500',
        primaryText: 'text-white',
        accent: 'bg-lime-400',
    },
];

const TailwindConfiguratorElement: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        if (isActive) {
            const timer = setInterval(() => {
                setThemeIndex(prev => (prev + 1) % themes.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isActive]);

    const theme = themes[themeIndex];

    return (
        <div className={`w-full h-full p-4 flex items-center justify-center rounded-lg transition-colors duration-1000 ${theme.bg}`}>
            <div className="w-1/3 flex flex-col justify-center items-center text-center">
                <div className={`text-xs font-bold uppercase transition-colors duration-1000 ${theme.textMuted}`}>Theme</div>
                <div className={`text-lg font-semibold transition-opacity duration-500 ${theme.text}`} key={theme.name}>{theme.name}</div>
                <div className="flex items-center gap-2 pt-2">
                    <div className={`w-8 h-4 rounded-full transition-colors duration-1000 ${theme.primary}`}></div>
                    <div className={`w-8 h-4 rounded-full transition-colors duration-1000 ${theme.accent}`}></div>
                </div>
            </div>

            <div className="w-2/3 h-full flex items-center justify-center p-2">
                 <div className={`w-full max-w-xs p-4 rounded-lg shadow-lg transition-colors duration-1000 ${theme.cardBg}`}>
                     <h3 className={`font-bold transition-colors duration-1000 ${theme.text}`}>Live Preview</h3>
                     <p className={`mt-1 text-xs transition-colors duration-1000 ${theme.textMuted}`}>This is how your components will look.</p>
                     
                     <div className={`mt-4 p-2 text-xs rounded-md transition-colors duration-1000 ${theme.accent} bg-opacity-20 text-opacity-80 ${theme.text}`}>
                         This is an alert message!
                     </div>

                     <button className={`mt-4 w-full px-4 py-2 text-xs font-semibold rounded transition-colors duration-1000 ${theme.primary} ${theme.primaryText}`}>
                        Get Started
                     </button>
                 </div>
            </div>
        </div>
    );
};

export default TailwindConfiguratorElement;
