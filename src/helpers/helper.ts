export const preventCharacters = (event) => {
    if(event.target.value.length === 0 && event.key === '0') {
        event.preventDefault();
        return;
    }
    if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === 'E') {
        event.preventDefault();
    }
}