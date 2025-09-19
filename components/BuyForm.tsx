
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PanelData } from '../types';
import { CheckCircleIcon, CreditCardIcon } from './icons';

interface BuyFormProps {
    panelData: PanelData;
    onClose: () => void;
}

const BuyForm: React.FC<BuyFormProps> = ({ panelData, onClose }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvc: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (Object.values(cardDetails).some(v => v === '')) {
            alert('Please fill all payment fields.');
            return;
        }
        console.log(`Purchase for ${panelData.titleKey} with details:`, cardDetails);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center fade-in">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white">{t('buyForm.successTitle')}</h3>
                <p className="text-gray-300 mt-2">{t('buyForm.successMessage')}</p>
                 <button 
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-green-600 rounded-full text-sm font-semibold text-white hover:bg-green-500 transition-colors"
                >
                    Done
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {step === 1 && (
                <div className="flex flex-col h-full fade-in">
                    <h3 className="text-lg font-semibold text-white mb-4">{t('buyForm.step1.title')}</h3>
                    <div className="bg-white/5 p-4 rounded-lg flex-grow flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">{t(panelData.titleKey)}</span>
                            {panelData.price && (
                                <span className="font-bold text-white">
                                    {panelData.price.currency}{panelData.price.amount}
                                </span>
                            )}
                        </div>
                        {/* Fix: Access frequencyKey from the price object and ensure price exists. */}
                        {panelData.price && <p className="text-xs text-gray-500">{t(panelData.price.frequencyKey)}</p>}
                    </div>
                    <button 
                        onClick={() => setStep(2)}
                        className="w-full mt-6 px-5 py-3 bg-green-600 hover:bg-green-500 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-green-600/20"
                    >
                        {t('buyForm.step1.button')}
                    </button>
                </div>
            )}

            {step === 2 && (
                 <form onSubmit={handleSubmit} className="flex flex-col h-full fade-in">
                    <h3 className="text-lg font-semibold text-white mb-4">{t('buyForm.step2.title')}</h3>
                    <div className="space-y-4 flex-grow">
                        <input name="name" onChange={handleInputChange} placeholder={t('buyForm.step2.namePlaceholder')} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors" />
                        <div className="relative">
                             <CreditCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                             <input name="number" onChange={handleInputChange} placeholder={t('buyForm.step2.cardPlaceholder')} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors" />
                        </div>
                        <div className="flex gap-4">
                            <input name="expiry" onChange={handleInputChange} placeholder={t('buyForm.step2.expiryPlaceholder')} className="w-1/2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors" />
                            <input name="cvc" onChange={handleInputChange} placeholder={t('buyForm.step2.cvcPlaceholder')} className="w-1/2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors" />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="w-full mt-6 px-5 py-3 bg-green-600 hover:bg-green-500 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-green-600/20"
                    >
                        {t('buyForm.step2.button')}
                    </button>
                 </form>
            )}
        </div>
    );
};

export default BuyForm;