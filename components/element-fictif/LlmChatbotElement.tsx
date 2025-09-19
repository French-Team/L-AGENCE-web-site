import React, { useState, useEffect, useRef } from 'react';

const conversationScript = [
    { sender: 'user', text: "Can you explain the key features of the Visual Browser?" },
    { sender: 'bot', text: "typing" },
    { sender: 'bot', text: "Of course! The Visual Browser provides interactive dependency graphs, real-time code structure analysis, and component hierarchy visualization to help you navigate complex codebases with clarity." },
    { sender: 'user', text: "That sounds useful. How much is it?" },
    { sender: 'bot', text: "typing" },
    { sender: 'bot', text: "It's available for $49 per month. Would you like to start a free trial?" },
];

interface LlmChatbotElementProps {
    isActive: boolean;
}

const LlmChatbotElement: React.FC<LlmChatbotElementProps> = ({ isActive }) => {
    const [messages, setMessages] = useState<typeof conversationScript>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const clearTimer = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };

        if (isActive) {
            const runAnimation = () => {
                clearTimer(); // Clear previous timer on restart
                setMessages([]);
                let currentStep = 0;
                
                const nextStep = () => {
                    if (currentStep < conversationScript.length) {
                        const msg = conversationScript[currentStep];
                        const delay = msg.text === 'typing' ? 1000 : msg.sender === 'user' ? 800 : 2000;
                        setMessages(prev => [...prev, msg]);
                        currentStep++;
                        timerRef.current = setTimeout(nextStep, delay);
                    } else {
                        timerRef.current = setTimeout(runAnimation, 3000); // Restart after a pause
                    }
                };
                nextStep();
            };
            runAnimation();
        } else {
            clearTimer();
            setMessages([]);
        }

        return clearTimer;
    }, [isActive]);

    return (
        <div className="w-full h-full p-4 flex flex-col font-sans text-sm bg-gray-900/50 rounded-lg">
            <div className="flex-grow space-y-3 overflow-hidden pr-2">
                {messages.map((msg, index) => {
                     if (msg.text === 'typing') {
                        return (
                             <div key={index} className="flex justify-start animate-fade-in-up">
                                <div className="bg-gray-700/80 text-white p-2 rounded-lg flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={index} className={`flex animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${msg.sender === 'user' ? 'bg-indigo-600' : 'bg-gray-700/80'} text-white p-2.5 rounded-lg max-w-[80%] leading-relaxed`}>
                                {msg.text}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 flex-shrink-0">
                <div className="w-full bg-gray-800/80 rounded-full p-2 text-gray-400 text-xs">
                    Ask about our services...
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default LlmChatbotElement;