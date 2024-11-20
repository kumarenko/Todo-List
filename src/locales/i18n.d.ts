import 'react-i18next';

// Импортируйте JSON-файлы переводов
import enTranslations from './en.json';

// Определите тип ресурса, основанный на JSON-файлах
type TranslationResources = typeof enTranslations;

// Расширьте типы i18next
declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation'; // Укажите пространство имен по умолчанию
        resources: TranslationResources;
    }
}