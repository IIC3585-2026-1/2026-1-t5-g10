import axios from 'axios'

const API_BASE_URL = 'https://open.er-api.com/v6/latest'
const FAWAZ_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api'

export async function fetchExchangeRates(baseCurrency = 'USD') {
  try {
    const response = await axios.get(`${API_BASE_URL}/${baseCurrency}`)
    return response.data.rates
  } catch (error) {
    throw new Error('No se pudieron obtener las tasas de cambio. Verifica tu conexión.')
  }
}

export async function fetchHistoricalRates(from, to, days = 30) {
  const fromKey = from.toLowerCase()
  const toKey = to.toLowerCase()

  // Sample 10 evenly-spaced dates across the period
  const today = new Date()
  const step = Math.floor(days / 9)
  const dates = []
  for (let i = days; i >= 0; i -= step) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    dates.push(d.toISOString().split('T')[0])
  }

  try {
    const results = await Promise.all(
      dates.map(date =>
        axios
          .get(`${FAWAZ_BASE}@${date}/v1/currencies/${fromKey}.min.json`)
          .then(r => ({ date, rate: r.data[fromKey]?.[toKey] ?? null }))
          .catch(() => ({ date, rate: null }))
      )
    )
    const filtered = results.filter(r => r.rate !== null)
    if (!filtered.length) throw new Error('No se pudo obtener el historial de tasas.')
    return filtered
  } catch (error) {
    throw new Error(error.message || 'No se pudo obtener el historial de tasas.')
  }
}
