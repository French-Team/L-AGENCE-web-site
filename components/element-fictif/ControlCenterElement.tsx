
import React, { useState, useEffect } from 'react';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const ControlCenterElement: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const [securityIssues, setSecurityIssues] = useState(2);
    const [coverage, setCoverage] = useState(92);
    const [techDebt, setTechDebt] = useState(3);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isActive) {
            interval = setInterval(() => {
                setSecurityIssues(getRandomInt(0, 5));
                setCoverage(getRandomInt(85, 95));
                setTechDebt(getRandomInt(1, 5));
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const statClass = `transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

    const StatNumber: React.FC<{ value: string | number; className: string }> = ({ value, className }) => (
        <div key={value} className={`text-2xl font-bold animate-fade-in ${className}`}>
            {value}
        </div>
    );
     return (
        <div className="w-full h-full p-4 grid grid-cols-2 grid-rows-2 gap-4 text-white">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
            <div className={`bg-white/5 rounded-lg p-2 flex flex-col justify-center items-center ${statClass}`} style={{ transitionDelay: '100ms' }}>
                <div className="text-xs text-gray-400">Code Quality</div>
                <div className="text-2xl font-bold text-green-400">A+</div>
            </div>
            <div className={`bg-white/5 rounded-lg p-2 flex flex-col justify-center items-center ${statClass}`} style={{ transitionDelay: '200ms' }}>
                 <div className="text-xs text-gray-400">Security</div>
                 <StatNumber value={`${securityIssues} Issues`} className={securityIssues > 0 ? 'text-amber-400' : 'text-green-400'} />
            </div>
            <div className={`bg-white/5 rounded-lg p-2 flex flex-col justify-center items-center ${statClass}`} style={{ transitionDelay: '300ms' }}>
                <div className="text-xs text-gray-400">Coverage</div>
                <StatNumber value={`${coverage}%`} className="text-sky-400" />
            </div>
            <div className={`bg-white/5 rounded-lg p-2 flex flex-col justify-center items-center ${statClass}`} style={{ transitionDelay: '400ms' }}>
                <div className="text-xs text-gray-400">Tech Debt</div>
                <StatNumber value={`${techDebt}d`} className={techDebt > 3 ? 'text-rose-400' : 'text-amber-400'} />
            </div>
        </div>
    );
};

export default ControlCenterElement;
