import React, { useState, useEffect, useRef } from 'react';

const logs = [
    { text: "$ create-project my-app --template=react-ts", isCommand: true },
    { text: "✔ Creating project directory...", isCommand: false },
    { text: "✔ Initializing git repository...", isCommand: false },
    { text: "✔ Installing dependencies (react, typescript)...", isCommand: false },
    { text: "✔ Configuring CI/CD pipeline...", isCommand: false },
    { text: "🚀 Project 'my-app' is ready!", isCommand: false },
];

const ProjectCreatorElement: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const [lines, setLines] = useState<{ text: string; fullText: string }[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const lineTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const charTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const clearAllTimers = () => {
            if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
            if (charTimerRef.current) clearInterval(charTimerRef.current);
            if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        };

        if (isActive) {
            const runAnimation = () => {
                clearAllTimers();

                setLines([]);
                setIsComplete(false);
                let lineIndex = 0;

                const processLine = () => {
                    if (lineIndex >= logs.length) {
                        setIsComplete(true);
                        restartTimerRef.current = setTimeout(runAnimation, 4000);
                        return;
                    }

                    const currentLog = logs[lineIndex];
                    setLines(prev => [...prev, { text: currentLog.isCommand ? '$ ' : '', fullText: (currentLog.isCommand ? '$ ' : '') + currentLog.text }]);
                    
                    let charIndex = currentLog.isCommand ? 2 : 0;
                    
                    charTimerRef.current = setInterval(() => {
                        setLines(prev => {
                            // Guard against race condition where state is reset before interval fires
                            if (!prev[lineIndex]) {
                                if (charTimerRef.current) clearInterval(charTimerRef.current);
                                return prev;
                            }

                            const newLines = [...prev];
                            if(newLines[lineIndex].text.length < newLines[lineIndex].fullText.length) {
                                newLines[lineIndex] = {
                                    ...newLines[lineIndex],
                                    text: newLines[lineIndex].text + newLines[lineIndex].fullText[charIndex]
                                };
                                charIndex++;
                                return newLines;
                            } else {
                                if (charTimerRef.current) clearInterval(charTimerRef.current);
                                lineIndex++;
                                lineTimerRef.current = setTimeout(processLine, currentLog.isCommand ? 1000 : 300);
                                return prev;
                            }
                        });
                    }, 50);
                };
                processLine();
            };
            runAnimation();
        } else {
            clearAllTimers();
            setLines([]);
        }

        return clearAllTimers;
    }, [isActive]);
    
    return (
        <div className="w-full h-full bg-gray-900/80 rounded-lg shadow-lg flex flex-col font-mono text-xs text-left overflow-hidden">
            <div className="bg-gray-700/50 flex-shrink-0 p-2 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            </div>
            <div className="p-4 text-gray-300 flex-grow">
                {lines.map((line, index) => (
                    <p key={index} className="whitespace-nowrap">
                        <span className={line.fullText.includes('✔') ? 'text-green-400' : line.fullText.includes('🚀') ? 'text-indigo-400' : 'text-gray-300'}>{line.text}</span>
                        {index === lines.length - 1 && !isComplete && <span className="inline-block w-2 h-3 bg-white/80 animate-blink"></span>}
                    </p>
                ))}
            </div>
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink { animation: blink 1s step-end infinite; }
            `}</style>
        </div>
    );
};

export default ProjectCreatorElement;