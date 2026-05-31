<script>
  import { createEventDispatcher } from 'svelte';
  import { loading } from '../stores.js';

  const dispatch = createEventDispatcher();

  function handleRefresh() {
    dispatch('refresh');
  }
</script>

<header class="header">
  <div class="header-content">
    <div class="title-section">
      <h1>MoneyExchange</h1>
      <p>Conversor de Divisas en Tiempo Real</p>
    </div>
    <button 
      class="refresh-btn"
      on:click={handleRefresh}
      disabled={$loading}
      title="Actualizar tasas de cambio"
    >
      {$loading ? 'Actualizando...' : 'Actualizar'}
    </button>
  </div>
</header>

<style>
  .header {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    padding: 32px 28px;
    border-radius: 24px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 1px 1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 32px;
    animation: slideDown 0.5s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .title-section h1 {
    font-size: 2.8rem;
    color: #ffffff;
    margin-bottom: 8px;
    font-weight: 700;
    background: linear-gradient(135deg, #e6e6fa 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }

  .title-section p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .refresh-btn {
    background: linear-gradient(135deg, rgba(52, 211, 153, 0.3), rgba(16, 185, 129, 0.2));
    border: 1.5px solid rgba(16, 185, 129, 0.4);
    color: #ffffff;
    padding: 12px 24px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);
  }

  .refresh-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(52, 211, 153, 0.4), rgba(16, 185, 129, 0.3));
    border-color: rgba(16, 185, 129, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.25);
  }

  .refresh-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .refresh-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinning {
    display: inline-block;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .header {
      padding: 24px 20px;
      margin-bottom: 24px;
    }

    .header-content {
      flex-direction: column;
      align-items: stretch;
    }

    .title-section h1 {
      font-size: 2.2rem;
    }

    .refresh-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
