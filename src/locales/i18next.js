import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './en.json';
import ruTranslations from './ru.json';
import frTranslations from './fr.json';
import deTranslations from './de.json';
import uaTranslations from './ua.json';

const savedState = localStorage.getItem('persist:root');
let savedLanguage = 'en';
if (savedState) {
    try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.settings) {
            const settings = JSON.parse(parsedState.settings);
            savedLanguage = settings.language || 'en';
        }
    } catch (error) {
        console.error('Error parsing language from persisted state:', error);
    }
}

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslations },
        ru: { translation: ruTranslations },
        fr: { translation: frTranslations },
        de: { translation: deTranslations },
        ua: { translation: uaTranslations },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

