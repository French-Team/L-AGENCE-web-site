
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
    const { t } = useTranslation();
    const title = t('appTitle');
    const [animationState, setAnimationState] = useState('in'); // 'in', 'out'
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const appearDuration = title.length * 200; // 0.2s per letter
        const holdDuration = 3000; // Hold for 3s
        const fadeOutDuration = 500; // Fade out over 0.5s
        const pauseDuration = 500; // Pause before restart

        // Schedule fade out
        const outTimer = setTimeout(() => {
            setAnimationState('out');
        }, appearDuration + holdDuration);

        // Schedule reset
        const resetTimer = setTimeout(() => {
            setAnimationKey(prev => prev + 1);
            setAnimationState('in');
        }, appearDuration + holdDuration + fadeOutDuration + pauseDuration);
        
        return () => {
            clearTimeout(outTimer);
            clearTimeout(resetTimer);
        };

    }, [animationKey, title]);

    return (
        <header id="app-header" className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-20">
            <div 
                id="agency-title" 
                key={animationKey} 
                className={`flex text-3xl font-bold tracking-widest uppercase ${animationState === 'out' ? 'animate-fade-out-title' : ''}`}
                style={{ height: '2.25rem' }} // Corresponds to text-3xl line-height to prevent layout shift
            >
                {title.split('').map((char, index) => (
                    <span
                        key={index}
                        className="animate-fade-in-letter"
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button 
                    id="contact-button" 
                    className="hidden sm:block px-6 py-2 border border-white/50 rounded-full text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300"
                    onClick={onContactClick}
                >
                    {t('contact')}
                </button>
            </div>
        </header>
    );
};

export default Header;
