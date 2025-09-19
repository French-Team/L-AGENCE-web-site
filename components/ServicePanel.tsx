import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServicePanelProps } from '../types';
import StarRating from './StarRating';
import FictionalElement from './element-fictif/FictionalElement';

const ServicePanel: React.FC<ServicePanelProps> = ({ panelData, isActive, onDiscover }) => {
    const { t } = useTranslation();
    const { id, titleKey, taglineKey, rating, key } = panelData;

    const contentDelay = isActive ? 'duration-700 delay-300' : 'duration-300';
    const contentOpacity = isActive ? 'opacity-100' : 'opacity-0';
    
    // Staggered animations for text elements
    const stagger = (baseDelay: string) => 
        `transition-all ${contentDelay} ${contentOpacity} ${isActive ? 'translate-y-0' : 'translate-y-4'} ${baseDelay}`;

    return (
        <div id={`panel-container-${id}`} className="w-screen h-screen flex-shrink-0 grid md:grid-cols-2 items-center gap-8 px-8 md:px-16 lg:px-24">
            
            {/* Left Column: Content */}
            <div className="flex flex-col text-left">
                <div className={stagger('delay-[400ms]')}>
                    <h3 id={`service-panel-title-${id}`} className="text-sm font-bold uppercase tracking-widest text-indigo-400">{t(titleKey)}</h3>
                    <h2 id={`service-panel-tagline-${id}`} className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">{t(taglineKey)}</h2>
                </div>

                <div className={`pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 ${stagger('delay-[500ms]')}`}>
                    <StarRating rating={rating} panelId={id} />
                    <button 
                        id={`discover-button-${id}`} 
                        className="w-full sm:w-auto px-8 py-3 bg-indigo-600 rounded-full text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 transform hover:scale-105"
                        onClick={() => onDiscover(panelData)}
                    >
                        {t('discover')}
                    </button>
                </div>
            </div>

            {/* Right Column: Fictional Element */}
            <div className={`relative h-64 md:h-96 lg:h-[32rem] transition-all ${contentDelay} ${contentOpacity} ${isActive ? 'scale-100' : 'scale-90'} delay-[600ms]`}>
                <FictionalElement panelKey={key} isActive={isActive} />
            </div>

        </div>
    );
};

export default ServicePanel;