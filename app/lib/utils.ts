export function formatToCurrency(num: number) {
    return num.toLocaleString("en-US", { style: "currency", currency: 'PHP', currencySign: 'standard' });
}