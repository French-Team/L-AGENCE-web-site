
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HomePanelProps } from '../types';
import ConceptualGraphic from './ConceptualGraphic';
import { ChevronRightIcon } from './icons';

const HomePanel: React.FC<HomePanelProps> = ({ panelData, isActive, onNavigateToFirstService }) => {
    const { t } = useTranslation();
    const { taglineKey, descriptionKey } = panelData;

    const contentDelay = isActive ? 'duration-700 delay-300' : 'duration-300';
    const contentOpacity = isActive ? 'opacity-100' : 'opacity-0';
    const contentTransform = isActive ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95';

    const staggeredItem = (delay: string) => 
        `transition-all ${contentDelay} ${contentOpacity} ${isActive ? 'translate-y-0' : 'translate-y-4'} ${delay}`;

    return (
        <div id={`panel-container-${panelData.id}`} className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
            <ConceptualGraphic />

            {/* Main "Business Card" element */}
            <div 
                id="home-panel-content-card"
                className={`relative z-10 w-full max-w-4xl bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl transition-all ${contentDelay} ${contentOpacity} ${contentTransform}`}
            >
                <div className="flex flex-col gap-8">
                    {/* Header Section */}
                    <div className={staggeredItem('delay-[400ms]')}>
                        <h1 id="home-panel-agency-title" className="text-xl md:text-2xl font-bold tracking-widest uppercase text-gray-400">
                            {t('appTitle')}
                        </h1>
                        <h2 id="home-panel-tagline" className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                            {t(taglineKey)}
                        </h2>
                        {descriptionKey && (
                            <p id="home-panel-description" className="mt-4 max-w-3xl text-lg text-gray-400">
                                {t(descriptionKey)}
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className={`w-full h-px bg-white/10 ${staggeredItem('delay-[500ms]')}`}></div>

                    {/* Details Section */}
                    <div className={`grid md:grid-cols-2 gap-8 text-left ${staggeredItem('delay-[600ms]')}`}>
                        {/* Specializations */}
                        <div>
                            <h3 className="font-semibold text-white">{t('home.card.specializations.title')}</h3>
                            <ul className="mt-2 space-y-1 text-sm text-gray-400">
                                <li>{t('home.card.specializations.item1')}</li>
                                <li>{t('home.card.specializations.item2')}</li>
                                <li>{t('home.card.specializations.item3')}</li>
                            </ul>
                        </div>
                        {/* Philosophy */}
                        <div>
                            <h3 className="font-semibold text-white">{t('home.card.philosophy.title')}</h3>
                            <p className="mt-2 text-sm text-gray-400">{t('home.card.philosophy.text')}</p>
                        </div>
                    </div>

                    {/* CTA to services */}
                    {onNavigateToFirstService && (
                         <div className={`pt-8 border-t border-white/10 text-center ${staggeredItem('delay-[700ms]')}`}>
                            <button
                                id="home-discover-button"
                                onClick={onNavigateToFirstService}
                                className="px-8 py-3 bg-indigo-600 rounded-full text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 transform hover:scale-105"
                            >
                                {t('discover')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div 
                id="home-scroll-prompt"
                className={`absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 delay-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
            >
                <span className="text-xs text-gray-500 uppercase tracking-widest">{t('homeScrollPrompt')}</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-500 animate-pulse-horizontal" />
            </div>
        </div>
    );
};

export default HomePanel;