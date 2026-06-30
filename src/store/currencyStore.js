import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPricingForCountry } from '@/lib/currency';
export const useCurrencyStore = create()(persist((set) => ({
    countryCode: 'US', // Default
    currency: 'USD',
    pricing: getPricingForCountry('US'),
    setCountry: (countryCode) => {
        const newPricing = getPricingForCountry(countryCode);
        set({
            countryCode: countryCode.toUpperCase(),
            currency: newPricing.currency,
            pricing: newPricing,
        });
    },
}), {
    name: 'stords-currency-storage',
}));
