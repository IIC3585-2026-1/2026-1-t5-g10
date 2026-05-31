import { writable, derived } from 'svelte/store';

// Estado inicial para las tasas de cambio
export const exchangeRates = writable({
  USD: 1,
  EUR: 0.95,
  MXN: 17.05,
  CLP: 900,
  COP: 4000,
  ARS: 850,
  BRL: 4.95,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 149.50,
  GBP: 0.79,
  CHF: 0.88
});

// Estado para la cantidad a convertir
export const amount = writable(100);

// Estado para la moneda de origen
export const sourceCurrency = writable('USD');

// Estado para la moneda de destino
export const targetCurrency = writable('MXN');

// Estado para cargar datos
export const loading = writable(false);
export const error = writable(null);
export const lastUpdate = writable(new Date());

// Monedas disponibles
export const availableCurrencies = writable([
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
  { code: 'BRL', name: 'Real Brasileño', symbol: 'R$' },
  { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$' },
  { code: 'JPY', name: 'Yen Japonés', symbol: '¥' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
  { code: 'CHF', name: 'Franco Suizo', symbol: 'CHF' }
]);

// Derivado: cantidad convertida
export const convertedAmount = derived(
  [amount, exchangeRates, sourceCurrency, targetCurrency],
  ([$amount, $rates, $source, $target]) => {
    if ($source === $target) return $amount;
    
    const sourceRate = $rates[$source] || 1;
    const targetRate = $rates[$target] || 1;
    
    // Convertir a USD primero, luego a la moneda destino
    const amountInUSD = $amount / sourceRate;
    return amountInUSD * targetRate;
  }
);

// Derivado: tasa de cambio actual
export const currentExchangeRate = derived(
  [exchangeRates, sourceCurrency, targetCurrency],
  ([$rates, $source, $target]) => {
    if ($source === $target) return 1;
    
    const sourceRate = $rates[$source] || 1;
    const targetRate = $rates[$target] || 1;
    
    return targetRate / sourceRate;
  }
);
