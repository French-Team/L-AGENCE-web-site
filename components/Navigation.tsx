
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationProps } from '../types';

const Navigation: React.FC<NavigationProps> = ({ panels, activeIndex, onNavigate }) => {
    const { t } = useTranslation();

    return (
        <nav id="horizontal-navigation" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {panels.map((panel, index) => {
                const title = t(panel.titleKey);
                return (
                    <button
                        key={panel.id}
                        id={`nav-button-${panel.id}`}
                        onClick={() => onNavigate(index)}
                        className="group relative flex justify-center p-2"
                        aria-label={t('goToSectionAriaLabel', { title })}
                        aria-current={activeIndex === index ? 'page' : undefined}
                    >
                        <span className={`absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded-md transition-opacity duration-300`}>
                            {title}
                        </span>
                        <div
                            id={`nav-dot-${panel.id}`}
                            className={`w-2 h-2 rounded-full border border-white transition-all duration-300 ${
                                activeIndex === index ? 'bg-white scale-125' : 'bg-transparent'
                            }`}
                            aria-hidden="true"
                        ></div>
                    </button>
                )
            })}
        </nav>
    );
};

export default Navigation;