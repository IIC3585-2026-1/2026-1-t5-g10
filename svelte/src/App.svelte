<script>
  import { onMount } from 'svelte';
  import { fetchExchangeRates } from './services/currencyService.js';
  import { exchangeRates, loading, error, lastUpdate } from './stores.js';
  import Header from './components/Header.svelte';
  import ConverterCard from './components/ConverterCard.svelte';
  import ExchangeRateInfo from './components/ExchangeRateInfo.svelte';
  import UpdateStatus from './components/UpdateStatus.svelte';

  let autoRefreshInterval;

  onMount(async () => {
    // Cargar tasas de cambio al montar
    await loadExchangeRates();
    
    // Auto-actualizar cada 5 minutos (300,000 ms)
    autoRefreshInterval = setInterval(loadExchangeRates, 300000);

    return () => {
      if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    };
  });

  async function loadExchangeRates() {
    loading.set(true);
    error.set(null);
    
    try {
      const rates = await fetchExchangeRates('USD');
      exchangeRates.set(rates);
      lastUpdate.set(new Date());
    } catch (err) {
      error.set(err.message);
      console.error('Error:', err);
    } finally {
      loading.set(false);
    }
  }

  async function handleRefresh() {
    await loadExchangeRates();
  }
</script>

<div class="app-container">
  <Header on:refresh={handleRefresh} />
  
  <main class="main-content">
    <div class="converter-section">
      <ConverterCard />
      <ExchangeRateInfo />
    </div>
  </main>

  <footer class="app-footer">
    <UpdateStatus />
  </footer>
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
    padding: 20px;
    color: #333;
  }

  :global(body)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(230, 126, 34, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(52, 152, 219, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  .app-container {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }

  .converter-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .app-footer {
    padding: 20px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 30px 0;
    }

    .converter-section {
      gap: 18px;
    }
  }
</style>
