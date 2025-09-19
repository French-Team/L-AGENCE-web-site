
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PanelData } from '../types';
import { ArrowLeftIcon } from './icons';
import TryForm from './TryForm';
import BuyForm from './BuyForm';

interface ActionHandlerProps {
    actionType: 'try' | 'buy';
    panelData: PanelData;
    onBack: () => void;
    onClose: () => void;
}

const ActionHandler: React.FC<ActionHandlerProps> = ({ actionType, panelData, onBack, onClose }) => {
    const { t } = useTranslation();

    const title = actionType === 'try' ? t('tryForm.title') : t('buyForm.title');

    return (
        <div className="flex flex-col h-full fade-in">
            <div className="flex items-center mb-6 relative">
                <button 
                    onClick={onBack} 
                    className="absolute -left-1 text-gray-400 hover:text-white transition-colors"
                    aria-label={t('actionHandler.backButtonAriaLabel')}
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-white text-center w-full">{title}</h2>
            </div>
            
            {actionType === 'try' ? (
                <TryForm panelData={panelData} onClose={onClose} />
            ) : (
                <BuyForm panelData={panelData} onClose={onClose} />
            )}
        </div>
    );
};

export default ActionHandler;
