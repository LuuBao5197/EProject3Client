export function convertTime(timeString) {
    const date = new Date(timeString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleString('en-US', options).replace(',', '');
}