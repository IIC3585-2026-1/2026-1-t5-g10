<script>
import { ref, watch, onMounted, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { useCurrencyStore } from '../stores/currencyStore'
import { fetchHistoricalRates } from '../services/currencyService'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default {
  name: 'RateChart',
  components: { Line },
  setup() {
    const store = useCurrencyStore()
    const historicalData = ref([])
    const chartLoading = ref(false)
    const chartError = ref(null)

    const chartData = computed(() => ({
      labels: historicalData.value.map(d => d.date.slice(5)),
      datasets: [
        {
          data: historicalData.value.map(d => d.rate),
          borderColor: '#34d399',
          backgroundColor: 'rgba(52,211,153,0.10)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.3,
          fill: true,
        },
      ],
    }))

    const chartOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: {
            color: '#94a3b8',
            maxTicksLimit: 6,
            font: { size: 11 },
          },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          ticks: {
            color: '#94a3b8',
            font: { size: 11 },
            maxTicksLimit: 4,
            callback: (v) => v.toLocaleString('es-CL', { maximumSignificantDigits: 4 }),
          },
          grid: { color: 'rgba(148,163,184,0.1)' },
          border: { display: false },
        },
      },
    }))

    const pairLabel = computed(
      () => `${store.sourceCurrency} → ${store.targetCurrency}`
    )

    const minRate = computed(() =>
      historicalData.value.length
        ? Math.min(...historicalData.value.map(d => d.rate))
        : null
    )
    const maxRate = computed(() =>
      historicalData.value.length
        ? Math.max(...historicalData.value.map(d => d.rate))
        : null
    )

    async function loadChart() {
      historicalData.value = []
      chartError.value = null
      if (store.sourceCurrency === store.targetCurrency) return
      chartLoading.value = true
      try {
        historicalData.value = await fetchHistoricalRates(store.sourceCurrency, store.targetCurrency, 30)
      } catch (e) {
        chartError.value = e.message
      } finally {
        chartLoading.value = false
      }
    }

    onMounted(loadChart)
    watch(() => [store.sourceCurrency, store.targetCurrency], loadChart)

    return { chartData, chartOptions, chartLoading, chartError, pairLabel, minRate, maxRate, historicalData }
  }
}
</script>

<template>
  <div class="rate-chart-card">
    <div class="chart-header">
      <span class="chart-title">Historial 30 días</span>
      <span class="chart-pair">{{ pairLabel }}</span>
    </div>

    <div class="chart-body" v-if="!chartLoading && !chartError && historicalData.length">
      <div class="chart-stats">
        <div class="stat">
          <span class="stat-label">Mín</span>
          <span class="stat-value">{{ minRate?.toLocaleString('es-CL', { maximumSignificantDigits: 5 }) }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Máx</span>
          <span class="stat-value">{{ maxRate?.toLocaleString('es-CL', { maximumSignificantDigits: 5 }) }}</span>
        </div>
      </div>
      <div class="chart-container">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <div class="chart-loading" v-else-if="chartLoading">
      <div class="chart-skeleton"></div>
    </div>

    <div class="chart-error" v-else-if="chartError">
      {{ chartError }}
    </div>

    <div class="chart-same" v-else-if="!chartLoading">
      Selecciona dos monedas distintas para ver el historial.
    </div>
  </div>
</template>

<style src="../../../shared/styles/rate-chart.css"></style>
