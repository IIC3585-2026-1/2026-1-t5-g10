<script>
import { useCurrencyStore, formatAmount } from '../stores/currencyStore'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    selectedCurrency: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Monto'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'update:selectedCurrency'],
  setup(props, { emit }) {
    const store = useCurrencyStore()

    function onAmountChange(e) {
      emit('update:modelValue', parseFloat(e.target.value) || 0)
    }

    function onCurrencyChange(e) {
      emit('update:selectedCurrency', e.target.value)
    }

    function getCurrencySymbol(code) {
      const found = store.availableCurrencies.find(c => c.code === code)
      return found ? found.symbol : ''
    }

    function getCurrencyName(code) {
      const found = store.availableCurrencies.find(c => c.code === code)
      return found ? found.name : code
    }

    return { store, onAmountChange, onCurrencyChange, getCurrencySymbol, getCurrencyName, formatAmount }
  }
}
</script>

<template>
  <div class="currency-input-wrapper">
    <span class="input-label">{{ label }}</span>
    <div class="input-group">
      <div class="currency-selector">
        <select
          :value="selectedCurrency"
          @change="onCurrencyChange"
          class="currency-select"
        >
          <option
            v-for="currency in store.availableCurrencies"
            :key="currency.code"
            :value="currency.code"
          >
            {{ currency.code }} — {{ currency.name }}
          </option>
        </select>
        <div class="selected-display">
          <span class="currency-code">{{ selectedCurrency }}</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      <div class="amount-field">
        <span class="symbol">{{ getCurrencySymbol(selectedCurrency) }}</span>
        <input
          :type="readonly ? 'text' : 'number'"
          class="amount-input"
          :value="readonly ? formatAmount(modelValue, selectedCurrency) : modelValue"
          :readonly="readonly"
          min="0"
          step="any"
          @input="onAmountChange"
        />
      </div>
    </div>
    <span class="currency-name-hint">{{ getCurrencyName(selectedCurrency) }}</span>
  </div>
</template>

<style src="../../../shared/styles/currency-input.css"></style>
