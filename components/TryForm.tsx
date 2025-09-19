
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PanelData } from '../types';
import { CheckCircleIcon } from './icons';

interface TryFormProps {
    panelData: PanelData;
    onClose: () => void;
}

const TryForm: React.FC<TryFormProps> = ({ panelData, onClose }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        console.log(`Trial request for ${panelData.titleKey} with email: ${email}`);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center fade-in">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white">{t('tryForm.successTitle')}</h3>
                <p className="text-gray-300 mt-2">{t('tryForm.successMessage')}</p>
                 <button 
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-indigo-600 rounded-full text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <p className="text-gray-300 text-center mb-6">{t('tryForm.description')}</p>
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center">
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('tryForm.emailPlaceholder')}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-indigo-500'}`}
                        aria-invalid={!!error}
                        aria-describedby="email-error"
                    />
                </div>
                {error && <p id="email-error" className="text-red-400 text-xs mt-2">{error}</p>}
                
                <div className="flex-grow"></div>

                <button 
                    type="submit"
                    className="w-full mt-4 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20 disabled:bg-gray-600"
                    disabled={!email}
                >
                    {t('tryForm.button')}
                </button>
            </form>
        </div>
    );
};

export default TryForm;
