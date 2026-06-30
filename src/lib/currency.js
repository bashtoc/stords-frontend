// Map ISO country codes to default currencies
export const countryToCurrencyMap = {
    US: 'USD',
    GB: 'GBP',
    NG: 'NGN',
    CA: 'CAD',
    AU: 'AUD',
    ZA: 'ZAR',
    // Eurozone
    AT: 'EUR', BE: 'EUR', CY: 'EUR', EE: 'EUR', FI: 'EUR',
    FR: 'EUR', DE: 'EUR', GR: 'EUR', IE: 'EUR', IT: 'EUR',
    LV: 'EUR', LT: 'EUR', LU: 'EUR', MT: 'EUR', NL: 'EUR',
    PT: 'EUR', SK: 'EUR', SI: 'EUR', ES: 'EUR',
};
// Fixed regional pricing for the flagship HydraGrow Hair Oil
export const regionalPrices = {
    USD: { currency: 'USD', symbol: '$', price: 45 },
    GBP: { currency: 'GBP', symbol: '£', price: 40 },
    EUR: { currency: 'EUR', symbol: '€', price: 45 },
    NGN: { currency: 'NGN', symbol: '₦', price: 45000 },
    CAD: { currency: 'CAD', symbol: 'C$', price: 60 },
    AUD: { currency: 'AUD', symbol: 'A$', price: 65 },
    ZAR: { currency: 'ZAR', symbol: 'R', price: 850 },
};
/**
 * Format a number to the given currency using Intl.NumberFormat
 */
export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
}
/**
 * Get pricing details based on a 2-letter ISO country code.
 * Defaults to USD if the country isn't explicitly mapped.
 */
export function getPricingForCountry(countryCode = 'US') {
    const currencyCode = countryToCurrencyMap[countryCode.toUpperCase()] || 'USD';
    return regionalPrices[currencyCode];
}
