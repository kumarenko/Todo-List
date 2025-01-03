import currencies from './../configs/currencies.json';
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
    const selectedCurrency = currencies.find(currency => currency.country === countryCode);

    if(selectedCurrency) {
        return selectedCurrency.symbol;
    } else {
        return '$'
    }
};

export const getCurrencyCode = (countryCode) => {
    const selectedCurrency = currencies.find(currency => currency.country === countryCode);

    if(selectedCurrency) {
        return selectedCurrency.code;
    } else {
        return '$'
    }
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
export async function getCountryCodeByIP()  {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country;
    } catch (error) {
        console.error("Error by retrieving country by IP:", error);
        return '';
    }
}