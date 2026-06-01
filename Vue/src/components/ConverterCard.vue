<script>
import CurrencyInput from './CurrencyInput.vue'
import ExchangeRateInfo from './ExchangeRateInfo.vue'
import { useCurrencyStore } from '../stores/currencyStore'

export default {
  name: 'ConverterCard',
  components: {
    CurrencyInput,
    ExchangeRateInfo
  },
  setup() {
    const store = useCurrencyStore()

    function onAmountChange(val) {
      store.setAmount(val)
    }

    function onSourceCurrencyChange(code) {
      store.setSourceCurrency(code)
    }

    function onTargetCurrencyChange(code) {
      store.setTargetCurrency(code)
    }

    return {
      store,
      onAmountChange,
      onSourceCurrencyChange,
      onTargetCurrencyChange
    }
  }
}
</script>

<template>
  <div class="converter-card">
    <div class="card-header">
      <h2 class="card-title">Conversor</h2>
      <div class="card-badge">LIVE</div>
    </div>

    <div class="inputs-container">
      <CurrencyInput
        label="De"
        :modelValue="store.amount"
        :selectedCurrency="store.sourceCurrency"
        @update:modelValue="onAmountChange"
        @update:selectedCurrency="onSourceCurrencyChange"
      />

      <div class="swap-container">
        <button class="swap-btn" @click="store.swapCurrencies()" title="Intercambiar monedas">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M7 16V4m0 0L3 8m4-4l4 4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8v12m0 0l4-4m-4 4l-4-4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="swap-line"></div>
      </div>

      <CurrencyInput
        label="Para"
        :modelValue="store.convertedAmount"
        :selectedCurrency="store.targetCurrency"
        :readonly="true"
        @update:selectedCurrency="onTargetCurrencyChange"
      />
    </div>

    <ExchangeRateInfo />
  </div>
</template>

<style src="../../../shared/styles/converter-card.css"></style>
