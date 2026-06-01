<script>
  import { onMount, onDestroy } from 'svelte'
  import { sourceCurrency, targetCurrency } from '../stores.js'
  import { fetchHistoricalRates } from '../services/currencyService.js'
  import {
    Chart,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
  } from 'chart.js'

  Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

  let canvas
  let chart = null
  let chartLoading = false
  let chartError = null
  let minRate = null
  let maxRate = null
  let hasData = false

  $: pairLabel = `${$sourceCurrency} → ${$targetCurrency}`

  async function loadChart(from, to) {
    chartError = null
    minRate = null
    maxRate = null
    hasData = false

    if (from === to) {
      if (chart) { chart.destroy(); chart = null }
      return
    }

    chartLoading = true
    try {
      const data = await fetchHistoricalRates(from, to, 30)
      minRate = Math.min(...data.map(d => d.rate))
      maxRate = Math.max(...data.map(d => d.rate))
      hasData = true

      const labels = data.map(d => d.date.slice(5))
      const values = data.map(d => d.rate)

      if (chart) {
        chart.data.labels = labels
        chart.data.datasets[0].data = values
        chart.update()
      } else {
        chart = new Chart(canvas, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              data: values,
              borderColor: '#34d399',
              backgroundColor: 'rgba(52,211,153,0.10)',
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
              tension: 0.3,
              fill: true,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { legend: { display: false } },
            scales: {
              x: {
                ticks: { color: '#94a3b8', maxTicksLimit: 6, font: { size: 11 } },
                grid: { display: false },
                border: { display: false },
              },
              y: {
                ticks: {
                  color: '#94a3b8',
                  font: { size: 11 },
                  maxTicksLimit: 4,
                  callback: v => v.toLocaleString('es-CL', { maximumSignificantDigits: 4 }),
                },
                grid: { color: 'rgba(148,163,184,0.1)' },
                border: { display: false },
              },
            },
          },
        })
      }
    } catch (e) {
      chartError = e.message
      if (chart) { chart.destroy(); chart = null }
    } finally {
      chartLoading = false
    }
  }

  // Reactive: re-load when currencies change (fires after onMount so canvas is ready)
  $: if (canvas) loadChart($sourceCurrency, $targetCurrency)

  onDestroy(() => { if (chart) chart.destroy() })
</script>

<div class="rate-chart-card">
  <div class="chart-header">
    <span class="chart-title">Historial 30 días</span>
    <span class="chart-pair">{pairLabel}</span>
  </div>

  {#if !chartLoading && !chartError && hasData}
    <div class="chart-stats">
      <div class="stat">
        <span class="stat-label">Mín</span>
        <span class="stat-value">{minRate.toLocaleString('es-CL', { maximumSignificantDigits: 5 })}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Máx</span>
        <span class="stat-value">{maxRate.toLocaleString('es-CL', { maximumSignificantDigits: 5 })}</span>
      </div>
    </div>
  {/if}

  <!-- canvas always in DOM so bind:this stays valid during async fetch -->
  <div class="chart-container" class:hidden={chartLoading || !!chartError || $sourceCurrency === $targetCurrency}>
    <canvas bind:this={canvas}></canvas>
  </div>

  {#if chartLoading}
    <div class="chart-skeleton"></div>
  {:else if chartError}
    <div class="chart-error">{chartError}</div>
  {:else if $sourceCurrency === $targetCurrency}
    <div class="chart-same">Selecciona dos monedas distintas para ver el historial.</div>
  {/if}
</div>

<style>
  @import '../styles/RateChart.css';

  .hidden { display: none; }
</style>
