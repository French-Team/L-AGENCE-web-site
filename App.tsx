
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PANELS_DATA } from './constants';
import Panel from './components/Panel';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ServiceDetailModal from './components/ServiceDetailModal';
import { PanelData } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import ContactModal from './components/ContactModal';
import Team from './components/Team';

const App: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedPanel, setSelectedPanel] = useState<PanelData | null>(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const isScrolling = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleWheel = useCallback((event: WheelEvent) => {
        if (isScrolling.current || selectedPanel || isContactModalOpen) return;
        
        isScrolling.current = true;

        if (event.deltaY > 0) {
            setActiveIndex(prevIndex => Math.min(prevIndex + 1, PANELS_DATA.length - 1));
        } else {
            setActiveIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 1000); // Cooldown to match transition duration + a buffer
    }, [selectedPanel, isContactModalOpen]);

    useEffect(() => {
        const container = containerRef.current;
        container?.addEventListener('wheel', handleWheel, { passive: true });

        return () => {
            container?.removeEventListener('wheel', handleWheel);
        };
    }, [handleWheel]);

    useEffect(() => {
        if (selectedPanel || isContactModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [selectedPanel, isContactModalOpen]);

    const handleDiscoverClick = (panelData: PanelData) => {
        setSelectedPanel(panelData);
    };

    const handleCloseModal = () => {
        setSelectedPanel(null);
    };

    const handleNavigateToGithub = () => {
        const githubPanelIndex = PANELS_DATA.findIndex(p => p.key === 'github');
        if (githubPanelIndex !== -1) {
            setActiveIndex(githubPanelIndex);
        }
        handleCloseModal();
    };

    const handleOpenContactModal = () => setIsContactModalOpen(true);
    const handleCloseContactModal = () => setIsContactModalOpen(false);

    return (
        <div id="app-container" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-gray-900 font-sans text-gray-100">
            <ErrorBoundary fallback={<header className="absolute top-0 left-0 right-0 p-8 text-sm text-red-400 z-20">Header failed to load.</header>}>
                <Header onContactClick={handleOpenContactModal} />
            </ErrorBoundary>

            <ErrorBoundary>
                <Team />
            </ErrorBoundary>

            {/* Panels Container */}
            <ErrorBoundary>
                <div
                    id="panels-scrolling-container"
                    className="flex h-full transition-transform duration-1000 ease-in-out"
                    style={{
                        width: `${PANELS_DATA.length * 100}vw`,
                        transform: `translateX(-${activeIndex * 100}vw)`,
                    }}
                >
                    {PANELS_DATA.map((panel, index) => (
                        <ErrorBoundary key={panel.id}>
                            <Panel 
                                panelData={panel} 
                                isActive={index === activeIndex} 
                                onDiscover={handleDiscoverClick}
                                onNavigateToFirstService={panel.key === 'home' ? () => setActiveIndex(1) : undefined}
                            />
                        </ErrorBoundary>
                    ))}
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary fallback={<nav className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-red-400 z-20">Navigation failed to load.</nav>}>
                <Navigation panels={PANELS_DATA} activeIndex={activeIndex} onNavigate={setActiveIndex} />
            </ErrorBoundary>

            {selectedPanel && (
                <ErrorBoundary fallback={null}>
                    <ServiceDetailModal 
                        panelData={selectedPanel} 
                        onClose={handleCloseModal}
                        onNavigateToGithub={handleNavigateToGithub}
                    />
                </ErrorBoundary>
            )}

            <ErrorBoundary fallback={null}>
                <ContactModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />
            </ErrorBoundary>
        </div>
    );
};

export default App;