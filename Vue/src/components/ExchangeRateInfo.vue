<script>
import { useCurrencyStore } from '../stores/currencyStore'

export default {
  name: 'ExchangeRateInfo',
  setup() {
    const store = useCurrencyStore()
    return { store }
  }
}
</script>

<template>
  <div class="rate-info" v-if="store.exchangeRate !== null && !store.loading">
    <div class="rate-line">
      <span class="rate-label">Tasa actual</span>
      <span class="rate-value">
        1 {{ store.sourceCurrency }}
        <span class="equals">=</span>
        {{ store.exchangeRate?.toFixed(4) }}
        {{ store.targetCurrency }}
      </span>
    </div>
    <div class="rate-inverse">
      1 {{ store.targetCurrency }} = {{ (1 / store.exchangeRate)?.toFixed(4) }} {{ store.sourceCurrency }}
    </div>
  </div>
  <div class="rate-info skeleton" v-else-if="store.loading">
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
</template>

<style src="../../../shared/styles/exchange-rate.css"></style>
