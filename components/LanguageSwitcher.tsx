import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'es', label: 'ES' },
];

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div id="language-switcher" className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-full p-1">
            {LANGUAGES.map(({ code, label }) => (
                <button
                    key={code}
                    id={`lang-button-${code}`}
                    onClick={() => changeLanguage(code)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
                        i18n.resolvedLanguage === code
                            ? 'bg-white text-gray-900'
                            : 'bg-transparent text-white hover:bg-white/10'
                    }`}
                    aria-pressed={i18n.resolvedLanguage === code}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;