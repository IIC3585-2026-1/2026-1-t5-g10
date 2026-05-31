<script>
  import { lastUpdate, error, loading } from '../stores.js';
  
  $: formattedTime = $lastUpdate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  $: formattedDate = $lastUpdate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
</script>

<div class="update-status">
  {#if $error}
    <div class="status-message error">
      <span>⚠️ Error: {$error}</span>
    </div>
  {:else}
    <div class="status-message">
      {#if $loading}
        <span class="spinner">●</span>
        <span>Actualizando tasas...</span>
      {:else}
        <span>✓ Actualizado</span>
        <span class="time">{formattedDate} a las {formattedTime}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .update-status {
    text-align: center;
    padding: 14px;
  }

  .status-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.2px;
  }

  .status-message.error {
    color: rgba(255, 107, 107, 0.9);
  }

  .spinner {
    display: inline-block;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .time {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.8rem;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @media (max-width: 768px) {
    .update-status {
      padding: 10px;
    }

    .status-message {
      font-size: 0.8rem;
      gap: 8px;
    }

    .time {
      display: block;
      font-size: 0.75rem;
      margin-top: 2px;
    }
  }
</style>
