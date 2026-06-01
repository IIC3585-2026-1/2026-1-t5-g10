<script>
  import { lastUpdate, error, loading } from '../stores.js'

  $: formattedTime = $lastUpdate ? $lastUpdate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) : ''
</script>

<div class="status-bar">
  {#if $error}
    <div class="error-msg">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {$error}
    </div>
  {:else if $loading}
    <div class="update-time pending">Cargando tasas...</div>
  {:else}
    <div class="update-time">
      <span class="dot"></span>
      Actualizado a las {formattedTime}
    </div>
  {/if}
</div>

