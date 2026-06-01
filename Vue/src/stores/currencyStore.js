import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchExchangeRates } from '../services/currencyService'

const DECIMAL_OVERRIDES = { JPY: 0, CLP: 0, KRW: 0, VND: 0, IDR: 0 }

export function formatAmount(amount, currencyCode) {
  const decimals = DECIMAL_OVERRIDES[currencyCode] ?? 2
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

export const useCurrencyStore = defineStore('currency', () => {
  const amount = ref(100)
  const sourceCurrency = ref('USD')
  const targetCurrency = ref('CLP')
  const exchangeRates = ref({})
  const loading = ref(false)
  const error = ref(null)
  const lastUpdate = ref(null)
  const conversionHistory = ref([])

  const availableCurrencies = ref([
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
  ])

  const convertedAmount = computed(() => {
    if (!exchangeRates.value || Object.keys(exchangeRates.value).length === 0) return 0
    if (sourceCurrency.value === targetCurrency.value) return amount.value

    const sourceRate = exchangeRates.value[sourceCurrency.value] ?? 1
    const targetRate = exchangeRates.value[targetCurrency.value] ?? 1

    return (amount.value / sourceRate) * targetRate
  })

  const exchangeRate = computed(() => {
    if (!exchangeRates.value || Object.keys(exchangeRates.value).length === 0) return null
    if (sourceCurrency.value === targetCurrency.value) return 1

    const sourceRate = exchangeRates.value[sourceCurrency.value] ?? 1
    const targetRate = exchangeRates.value[targetCurrency.value] ?? 1

    return targetRate / sourceRate
  })

  const formattedLastUpdate = computed(() => {
    if (!lastUpdate.value) return null
    return lastUpdate.value.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  })

  async function loadExchangeRates() {
    loading.value = true
    error.value = null
    try {
      const rates = await fetchExchangeRates('USD')
      exchangeRates.value = rates
      lastUpdate.value = new Date()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function swapCurrencies() {
    const temp = sourceCurrency.value
    sourceCurrency.value = targetCurrency.value
    targetCurrency.value = temp
  }

  function setAmount(val) {
    const parsed = parseFloat(val)
    amount.value = isNaN(parsed) ? 0 : parsed
  }

  function setSourceCurrency(code) {
    sourceCurrency.value = code
  }

  function setTargetCurrency(code) {
    targetCurrency.value = code
  }

  function addToHistory() {
    if (!convertedAmount.value || !amount.value) return
    conversionHistory.value.unshift({
      id: Date.now(),
      from: sourceCurrency.value,
      to: targetCurrency.value,
      amount: amount.value,
      result: convertedAmount.value,
      rate: exchangeRate.value,
      time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    })
    if (conversionHistory.value.length > 8) conversionHistory.value.pop()
  }

  return {
    amount,
    sourceCurrency,
    targetCurrency,
    exchangeRates,
    loading,
    error,
    lastUpdate,
    availableCurrencies,
    convertedAmount,
    exchangeRate,
    formattedLastUpdate,
    loadExchangeRates,
    swapCurrencies,
    setAmount,
    setSourceCurrency,
    setTargetCurrency,
    addToHistory,
    conversionHistory,
  }
})
