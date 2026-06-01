const DECIMAL_OVERRIDES = { JPY: 0, CLP: 0, KRW: 0, VND: 0, IDR: 0 };

export function formatAmount(amount, currencyCode) {
  const decimals = DECIMAL_OVERRIDES[currencyCode] ?? 2;
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined) return '0.00';
  const fixed = parseFloat(num).toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * Formatea un número de moneda con símbolo
 * @param {number} amount - Cantidad
 * @param {string} currency - Código de moneda
 * @param {Object} currencyData - Datos de la moneda
 * @returns {string} Formato: "$ 1,234.56"
 */
export function formatCurrency(amount, currency, currencyData) {
  const symbol = currencyData.find(c => c.code === currency)?.symbol || currency;
  const formatted = formatNumber(amount, 2);
  return `${symbol} ${formatted}`;
}

/**
 * Formatea una tasa de cambio
 * @param {number} rate - Tasa
 * @returns {string} Tasa formateada con 4 decimales
 */
export function formatRate(rate) {
  return formatNumber(rate, 4);
}
