import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TEAM_MEMBERS } from '../teamData';

const Team: React.FC = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationState, setAnimationState] = useState<'in' | 'out'>('in');

    useEffect(() => {
        if (TEAM_MEMBERS.length === 0) return;

        const memberDisplayDuration = 4000; // 4s
        const animationDuration = 500; // 0.5s

        const interval = setInterval(() => {
            setAnimationState('out'); // Start fade out animation
            
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % TEAM_MEMBERS.length);
                setAnimationState('in'); // Start fade in animation for next member
            }, animationDuration);

        }, memberDisplayDuration);

        return () => clearInterval(interval);
    }, []);

    if (TEAM_MEMBERS.length === 0) {
        return null;
    }

    const activeMember = TEAM_MEMBERS[currentIndex];

    return (
        <div id="team-toast-container" className="absolute top-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div 
                key={activeMember.id}
                className={`flex items-center gap-5 bg-black/30 backdrop-blur-md border border-white/10 rounded-full p-3 shadow-lg ${
                    animationState === 'in' ? 'animate-toast-in' : 'animate-toast-out'
                }`}
            >
                <img
                    src={activeMember.imageUrl}
                    alt={activeMember.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
                <div className="text-left pr-6">
                    <p className="font-bold text-white text-base">{activeMember.name}</p>
                    <p className="text-gray-300 text-sm">{t(activeMember.roleKey)}</p>
                </div>
            </div>
        </div>
    );
};

export default Team;