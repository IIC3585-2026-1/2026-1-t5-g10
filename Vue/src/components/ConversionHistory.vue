<script>
import { useCurrencyStore, formatAmount } from '../stores/currencyStore'

export default {
  name: 'ConversionHistory',
  setup() {
    const store = useCurrencyStore()
    return { store, formatAmount }
  }
}
</script>

<template>
  <div class="history-card" v-if="store.conversionHistory.length">
    <div class="history-header">
      <span class="history-title">Historial de conversiones</span>
      <button class="history-clear" @click="store.conversionHistory.splice(0)">Limpiar</button>
    </div>

    <ul class="history-list">
      <li
        v-for="entry in store.conversionHistory"
        :key="entry.id"
        class="history-item"
      >
        <div class="history-pair">
          <span class="history-from">
            {{ formatAmount(entry.amount, entry.from) }} {{ entry.from }}
          </span>
          <svg class="history-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="history-to">
            {{ formatAmount(entry.result, entry.to) }} {{ entry.to }}
          </span>
        </div>
        <span class="history-time">{{ entry.time }}</span>
      </li>
    </ul>
  </div>
</template>

<style src="../../../shared/styles/conversion-history.css"></style>
