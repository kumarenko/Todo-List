export const preventCharacters = (event) => {
    if(event.target.value.length === 0 && event.key === '0') {
        event.preventDefault();
        return;
    }
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