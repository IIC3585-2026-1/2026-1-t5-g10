import axios from 'axios';

// API pública gratuita para tasas de cambio
const API_BASE_URL = 'https://open.er-api.com/v6/latest';

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

/**
 * Obtiene la tasa de cambio entre dos monedas
 * @param {string} fromCurrency - Moneda de origen
 * @param {string} toCurrency - Moneda de destino
 * @param {Object} rates - Objeto con las tasas de cambio
 * @returns {number} Tasa de cambio
 */
export function getExchangeRate(fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return 1;
  
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  
  return toRate / fromRate;
}
