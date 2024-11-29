export const preventCharacters = (event) => {
    if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === 'E') {
        event.preventDefault();
    }
}
export const copyTextToClipboard = (text) => {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text)
            .then(() => {
                return 'success';
            })
            .catch(() => {
                return 'error';
            });
    } else {
        console.warn('Буфер обмена недоступен');
        return Promise.reject('Буфер обмена недоступен');
    }
};

export const getCurrencySymbol = (countryCode) => {
    const currencySymbols = {
        US: "$",
        CA: "$",
        PL: "zł",
        GB: "£",
        EU: "€",
        JP: "¥",
        CN: "¥",
        UA: "₴",
        RU: "₽",
        IN: "₹",
        AU: "$",
    };
    return currencySymbols[countryCode] || "$";
};

export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
export function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}