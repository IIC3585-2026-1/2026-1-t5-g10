<script>
import { onMounted, onUnmounted } from 'vue'
import { useCurrencyStore } from './stores/currencyStore'
import Header from './components/Header.vue'
import ConverterCard from './components/ConverterCard.vue'
import UpdateStatus from './components/UpdateStatus.vue'
import RateChart from './components/RateChart.vue'
import ConversionHistory from './components/ConversionHistory.vue'

export default {
  name: 'App',
  components: {
    Header,
    ConverterCard,
    UpdateStatus,
    RateChart,
    ConversionHistory,
  },
  setup() {
    const store = useCurrencyStore()
    let autoRefreshInterval = null

    onMounted(async () => {
      await store.loadExchangeRates()

      autoRefreshInterval = setInterval(() => {
        store.loadExchangeRates()
      }, 300_000)
    })

    onUnmounted(() => {
      if (autoRefreshInterval) clearInterval(autoRefreshInterval)
    })

    return { store }
  }
}
</script>

<template>
  <div class="app-layout">
    <div class="app-container">
      <Header />

      <main class="main-content">
        <div class="converter-wrapper">
          <ConverterCard />
          <button class="save-btn" @click="store.addToHistory()" :disabled="!store.exchangeRate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="save-icon">
              <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Guardar conversión
          </button>
          <UpdateStatus />
          <ConversionHistory />
        </div>

        <aside class="info-panel">
          <div class="info-block">
            <span class="info-label">Framework</span>
            <span class="info-value">Vue 3</span>
          </div>
          <div class="info-block">
            <span class="info-label">Estado</span>
            <span class="info-value">Pinia</span>
          </div>
          <div class="info-block">
            <span class="info-label">API</span>
            <span class="info-value">ExchangeRate API</span>
          </div>
          <div class="info-block">
            <span class="info-label">Monedas</span>
            <span class="info-value">{{ store.availableCurrencies.length }} disponibles</span>
          </div>

          <div class="currencies-list">
            <span class="info-label">Monedas disponibles</span>
            <div class="currency-tags">
              <span
                v-for="c in store.availableCurrencies"
                :key="c.code"
                class="currency-tag"
                :class="{
                  active: c.code === store.sourceCurrency || c.code === store.targetCurrency
                }"
                :title="c.code + ' — ' + c.name"
              >
                {{ c.flag }}
              </span>
            </div>
          </div>

          <RateChart />
        </aside>
      </main>

      <footer class="app-footer">
        <span>MoneyExchange — IIC3885 Grupo 10</span>
        <span class="footer-separator">·</span>
        <span>Vue 3 + Pinia</span>
      </footer>
    </div>
  </div>
</template>
