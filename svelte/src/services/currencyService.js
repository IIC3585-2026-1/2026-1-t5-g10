import axios from 'axios';

const API_BASE_URL = 'https://open.er-api.com/v6/latest';
const FAWAZ_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api';

/**
 * Obtiene las tasas de cambio más recientes de la API
 * @param {string} baseCurrency - Moneda base (por defecto USD)
 * @returns {Promise<Object>} Objeto con las tasas de cambio
 */
export async function fetchExchangeRates(baseCurrency = 'USD') {
  try {
    const response = await axios.get(`${API_BASE_URL}/${baseCurrency}`, {
      timeout: 5000
    });
    
    if (response.data && response.data.rates) {
      return response.data.rates;
    }
    
    throw new Error('Formato de respuesta inválido');
  } catch (error) {
    console.error('Error al obtener tasas de cambio:', error.message);
    throw new Error(`No se pudieron obtener las tasas de cambio: ${error.message}`);
  }
}

/**
 * Convierte una cantidad de una moneda a otra
 * @param {number} amount - Cantidad a convertir
 * @param {string} fromCurrency - Moneda de origen
 * @param {string} toCurrency - Moneda de destino
 * @param {Object} rates - Objeto con las tasas de cambio
 * @returns {number} Cantidad convertida
 */
export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  
  const amountInBase = amount / fromRate;
  return amountInBase * toRate;
}

export function getExchangeRate(fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return 1;
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  return toRate / fromRate;
}

export async function fetchHistoricalRates(from, to, days = 30) {
  const fromKey = from.toLowerCase();
  const toKey = to.toLowerCase();

  const today = new Date();
  const step = Math.floor(days / 9);
  const dates = [];
  for (let i = days; i >= 0; i -= step) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }

  try {
    const results = await Promise.all(
      dates.map(date =>
        axios
          .get(`${FAWAZ_BASE}@${date}/v1/currencies/${fromKey}.min.json`)
          .then(r => ({ date, rate: r.data[fromKey]?.[toKey] ?? null }))
          .catch(() => ({ date, rate: null }))
      )
    );
    const filtered = results.filter(r => r.rate !== null);
    if (!filtered.length) throw new Error('No se pudo obtener el historial de tasas.');
    return filtered;
  } catch (error) {
    throw new Error(error.message || 'No se pudo obtener el historial de tasas.');
  }
}
