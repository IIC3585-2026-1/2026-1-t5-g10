import { writable, derived, get } from 'svelte/store';

// Estado inicial para las tasas de cambio
export const exchangeRates = writable({});

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
  // Américas
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$',   flag: '🇺🇸' },
  { code: 'CAD', name: 'Dólar Canadiense',     symbol: 'C$',  flag: '🇨🇦' },
  { code: 'MXN', name: 'Peso Mexicano',        symbol: '$',   flag: '🇲🇽' },
  { code: 'CLP', name: 'Peso Chileno',         symbol: '$',   flag: '🇨🇱' },
  { code: 'COP', name: 'Peso Colombiano',      symbol: '$',   flag: '🇨🇴' },
  { code: 'ARS', name: 'Peso Argentino',       symbol: '$',   flag: '🇦🇷' },
  { code: 'BRL', name: 'Real Brasileño',       symbol: 'R$',  flag: '🇧🇷' },
  { code: 'PEN', name: 'Sol Peruano',          symbol: 'S/',  flag: '🇵🇪' },
  { code: 'UYU', name: 'Peso Uruguayo',        symbol: '$U',  flag: '🇺🇾' },
  // Europa
  { code: 'EUR', name: 'Euro',                 symbol: '€',   flag: '🇪🇺' },
  { code: 'GBP', name: 'Libra Esterlina',      symbol: '£',   flag: '🇬🇧' },
  { code: 'CHF', name: 'Franco Suizo',         symbol: 'CHF', flag: '🇨🇭' },
  { code: 'SEK', name: 'Corona Sueca',         symbol: 'kr',  flag: '🇸🇪' },
  { code: 'NOK', name: 'Corona Noruega',       symbol: 'kr',  flag: '🇳🇴' },
  { code: 'DKK', name: 'Corona Danesa',        symbol: 'kr',  flag: '🇩🇰' },
  { code: 'PLN', name: 'Esloti Polaco',        symbol: 'zł',  flag: '🇵🇱' },
  { code: 'TRY', name: 'Lira Turca',          symbol: '₺',   flag: '🇹🇷' },
  // Asia-Pacífico
  { code: 'JPY', name: 'Yen Japonés',          symbol: '¥',   flag: '🇯🇵' },
  { code: 'CNY', name: 'Yuan Chino',           symbol: '¥',   flag: '🇨🇳' },
  { code: 'KRW', name: 'Won Surcoreano',       symbol: '₩',   flag: '🇰🇷' },
  { code: 'HKD', name: 'Dólar de Hong Kong',  symbol: 'HK$', flag: '🇭🇰' },
  { code: 'SGD', name: 'Dólar Singapurense',  symbol: 'S$',  flag: '🇸🇬' },
  { code: 'AUD', name: 'Dólar Australiano',    symbol: 'A$',  flag: '🇦🇺' },
  { code: 'NZD', name: 'Dólar Neozelandés',   symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'INR', name: 'Rupia India',          symbol: '₹',   flag: '🇮🇳' },
  { code: 'THB', name: 'Baht Tailandés',       symbol: '฿',   flag: '🇹🇭' },
  // Medio Oriente y África
  { code: 'AED', name: 'Dírham Emiratí',      symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Riyal Saudí',         symbol: '﷼',   flag: '🇸🇦' },
  { code: 'ILS', name: 'Séquel Israelí',      symbol: '₪',   flag: '🇮🇱' },
  { code: 'ZAR', name: 'Rand Sudafricano',    symbol: 'R',   flag: '🇿🇦' },
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

export const currentExchangeRate = derived(
  [exchangeRates, sourceCurrency, targetCurrency],
  ([$rates, $source, $target]) => {
    if ($source === $target) return 1;
    const sourceRate = $rates[$source] || 1;
    const targetRate = $rates[$target] || 1;
    return targetRate / sourceRate;
  }
);

export const conversionHistory = writable([]);

export function addToHistory() {
  const $amount = get(amount);
  const $converted = get(convertedAmount);
  const $source = get(sourceCurrency);
  const $target = get(targetCurrency);
  const $rate = get(currentExchangeRate);
  if (!$converted || !$amount) return;
  conversionHistory.update(h => {
    const next = [{
      id: Date.now(),
      from: $source,
      to: $target,
      amount: $amount,
      result: $converted,
      rate: $rate,
      time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    }, ...h];
    return next.slice(0, 8);
  });
}
