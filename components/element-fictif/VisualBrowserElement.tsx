
import React from 'react';

const VisualBrowserElement: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const nodePositions = [
        { cx: "25%", cy: "50%" },
        { cx: "50%", cy: "25%" },
        { cx: "50%", cy: "75%" },
        { cx: "75%", cy: "50%" },
        { cx: "35%", cy: "35%" },
        { cx: "65%", cy: "65%" },
    ];
    const lines = [
        { x1: "25%", y1: "50%", x2: "50%", y2: "25%" },
        { x1: "25%", y1: "50%", x2: "50%", y2: "75%" },
        { x1: "50%", y1: "25%", x2: "75%", y2: "50%" },
        { x1: "50%", y1: "75%", x2: "75%", y2: "50%" },
        { x1: "35%", y1: "35%", x2: "25%", y2: "50%" },
        { x1: "35%", y1: "35%", x2: "50%", y2: "25%" },
        { x1: "65%", y1: "65%", x2: "50%", y2: "75%" },
        { x1: "65%", y1: "65%", x2: "75%", y2: "50%" },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
             <style>{`
                @keyframes pulse-node {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .node-pulse {
                    animation: pulse-node 2s ease-in-out infinite;
                    transform-origin: center;
                }
                @keyframes flow-line {
                    0% { stroke-dashoffset: 20; }
                    100% { stroke-dashoffset: 0; }
                }
                .line-flow {
                    stroke-dasharray: 10 10;
                    animation: flow-line 1.5s linear infinite;
                }
            `}</style>
            <svg width="100%" height="100%" viewBox="0 0 200 100">
                {/* Static base lines */}
                {lines.map((line, i) => (
                    <line key={`base-${i}`} {...line} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                ))}
                {/* Animated flow lines */}
                 {isActive && lines.map((line, i) => (
                    <line key={`flow-${i}`} {...line} stroke="rgba(165, 180, 252, 0.8)" strokeWidth="1.5" className="line-flow" style={{ animationDelay: `${i * 200}ms` }} />
                ))}

                {nodePositions.map((pos, i) => (
                    <g key={i} className={isActive ? 'node-pulse' : ''} style={{ animationDelay: `${i * 100}ms` }}>
                         <circle {...pos} r="8" fill="rgba(129, 140, 248, 0.5)" className={`transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }} />
                         <circle {...pos} r="4" fill="rgba(165, 180, 252, 1)" className={`transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }} />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default VisualBrowserElement;
