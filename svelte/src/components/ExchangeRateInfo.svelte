<script>
  import { currentExchangeRate, sourceCurrency, targetCurrency, loading } from '../stores.js'
</script>

{#if $currentExchangeRate !== null && !$loading}
  <div class="rate-info">
    <div class="rate-line">
      <span class="rate-label">Tasa actual</span>
      <span class="rate-value">
        1 {$sourceCurrency}
        <span class="equals">=</span>
        {$currentExchangeRate.toFixed(4)} {$targetCurrency}
      </span>
    </div>
    <div class="rate-inverse">
      1 {$targetCurrency} = {(1 / $currentExchangeRate).toFixed(4)} {$sourceCurrency}
    </div>
  </div>
{:else if $loading}
  <div class="rate-info skeleton">
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
{/if}

