<script>
  import { conversionHistory } from '../stores.js'
  import { formatAmount } from '../utils/formatters.js'
</script>

{#if $conversionHistory.length}
  <div class="history-card">
    <div class="history-header">
      <span class="history-title">Historial de conversiones</span>
      <button class="history-clear" on:click={() => conversionHistory.set([])}>Limpiar</button>
    </div>

    <ul class="history-list">
      {#each $conversionHistory as entry (entry.id)}
        <li class="history-item">
          <div class="history-pair">
            <span class="history-from">
              {formatAmount(entry.amount, entry.from)} {entry.from}
            </span>
            <svg class="history-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="history-to">
              {formatAmount(entry.result, entry.to)} {entry.to}
            </span>
          </div>
          <span class="history-time">{entry.time}</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  @import '../styles/ConversionHistory.css';
</style>
