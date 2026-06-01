<script>
  import { onMount } from 'svelte'
  import { fetchExchangeRates } from './services/currencyService.js'
  import { exchangeRates, loading, error, lastUpdate, addToHistory, conversionHistory, currentExchangeRate, availableCurrencies, sourceCurrency, targetCurrency } from './stores.js'
  import Header from './components/Header.svelte'
  import ConverterCard from './components/ConverterCard.svelte'
  import UpdateStatus from './components/UpdateStatus.svelte'
  import ConversionHistory from './components/ConversionHistory.svelte'
  import RateChart from './components/RateChart.svelte'

  let autoRefreshInterval

  onMount(async () => {
    await loadExchangeRates()
    autoRefreshInterval = setInterval(loadExchangeRates, 300000)
    return () => { if (autoRefreshInterval) clearInterval(autoRefreshInterval) }
  })

  async function loadExchangeRates() {
    loading.set(true)
    error.set(null)
    try {
      const rates = await fetchExchangeRates('USD')
      exchangeRates.set(rates)
      lastUpdate.set(new Date())
    } catch (err) {
      error.set(err.message)
    } finally {
      loading.set(false)
    }
  }

  async function handleRefresh() {
    await loadExchangeRates()
  }
</script>

<div class="app-shell">
  <Header on:refresh={handleRefresh} />

  <main class="main-content">
    <div class="converter-wrapper">
      <ConverterCard />
      <button class="save-btn" on:click={addToHistory} disabled={!$currentExchangeRate}>
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
        <span class="info-value">Svelte 4</span>
      </div>
      <div class="info-block">
        <span class="info-label">Estado</span>
        <span class="info-value">Svelte Stores</span>
      </div>
      <div class="info-block">
        <span class="info-label">API</span>
        <span class="info-value">ExchangeRate API</span>
      </div>
      <div class="info-block">
        <span class="info-label">Monedas</span>
        <span class="info-value">{$availableCurrencies.length} disponibles</span>
      </div>

      <div class="currencies-list">
        <span class="info-label">Monedas disponibles</span>
        <div class="currency-tags">
          {#each $availableCurrencies as c (c.code)}
            <span
              class="currency-tag"
              class:active={c.code === $sourceCurrency || c.code === $targetCurrency}
              title="{c.code} — {c.name}"
            >
              {c.flag}
            </span>
          {/each}
        </div>
      </div>

      <RateChart />
    </aside>
  </main>

  <footer class="app-footer">
    <span>MoneyExchange — IIC3885 Grupo 10</span>
    <span class="footer-separator">·</span>
    <span>Svelte 4 + Stores</span>
  </footer>
</div>

