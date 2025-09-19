import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
    // load translation using http -> see /public/locales
    .use(HttpBackend)
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        debug: true,
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'de', 'es'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        // This option will make i18next load 'fr' instead of 'fr-FR'
        load: 'languageOnly',
        backend: {
            loadPath: '/locales/{{lng}}.json',
        }
    });

export default i18n;