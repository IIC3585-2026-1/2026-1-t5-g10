<script>
  import { createEventDispatcher } from 'svelte'
  import { loading } from '../stores.js'

  const dispatch = createEventDispatcher()

  function handleRefresh() {
    dispatch('refresh')
  }
</script>

<header class="header">
  <div class="header-left">
    <div class="logo-mark">G10</div>
    <div class="header-titles">
      <h1 class="app-title">MoneyExchange</h1>
      <p class="app-subtitle">Tasas en tiempo real</p>
    </div>
  </div>
  <div class="header-right">
    <button
      class="refresh-btn"
      class:spinning={$loading}
      on:click={handleRefresh}
      disabled={$loading}
      title="Actualizar tasas"
    >
      <svg class="refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M1 4v6h6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M23 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>{$loading ? 'Actualizando...' : 'Actualizar'}</span>
    </button>
  </div>
</header>

