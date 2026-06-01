<script>
  import { amount, sourceCurrency, targetCurrency, convertedAmount } from '../stores.js'
  import CurrencyInput from './CurrencyInput.svelte'
  import ExchangeRateInfo from './ExchangeRateInfo.svelte'

  function swapCurrencies() {
    const temp = $sourceCurrency
    sourceCurrency.set($targetCurrency)
    targetCurrency.set(temp)
  }

  function handleAmountChange(newAmount) {
    amount.set(newAmount)
  }

  function handleSourceCurrencyChange(newCurrency) {
    sourceCurrency.set(newCurrency)
  }

  function handleTargetCurrencyChange(newCurrency) {
    targetCurrency.set(newCurrency)
  }
</script>

<div class="converter-card">
  <div class="card-header">
    <h2 class="card-title">Conversor</h2>
    <div class="card-badge">LIVE</div>
  </div>

  <div class="inputs-container">
    <CurrencyInput
      label="De"
      value={$amount}
      currency={$sourceCurrency}
      onChange={handleAmountChange}
      onCurrencyChange={handleSourceCurrencyChange}
    />

    <div class="swap-container">
      <button class="swap-btn" on:click={swapCurrencies} title="Intercambiar monedas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M7 16V4m0 0L3 8m4-4l4 4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 8v12m0 0l4-4m-4 4l-4-4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="swap-line"></div>
    </div>

    <CurrencyInput
      label="Para"
      value={$convertedAmount}
      currency={$targetCurrency}
      onChange={() => {}}
      onCurrencyChange={handleTargetCurrencyChange}
      readOnly={true}
    />
  </div>

  <ExchangeRateInfo />
</div>

