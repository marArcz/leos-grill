export function formatToCurrency(num: number) {
    return num.toLocaleString("en-US", { style: "currency", currency: 'PHP', currencySign: 'standard' });
}

export function generateOrderNumber(prefix: string = 'ORD'): string {
    const timestamp = Date.now().toString(36).toUpperCase(); // Base36 timestamp
    const randomStr = Math.random().toString(36).slice(2, 7).toUpperCase(); // 5-character random string
    return `${prefix}-${timestamp}-${randomStr}`;
}
