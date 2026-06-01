<script>
  import { availableCurrencies } from '../stores.js'
  import { formatAmount } from '../utils/formatters.js'

  export let label = ''
  export let value = 0
  export let currency = 'USD'
  export let onChange = () => {}
  export let onCurrencyChange = () => {}
  export let readOnly = false

  function handleAmountChange(e) {
    const newValue = parseFloat(e.target.value) || 0
    onChange(newValue)
  }

  function handleCurrencyChange(e) {
    onCurrencyChange(e.target.value)
  }

  function getCurrencySymbol(code) {
    const found = $availableCurrencies.find(c => c.code === code)
    return found ? found.symbol : ''
  }

  function getCurrencyName(code) {
    const found = $availableCurrencies.find(c => c.code === code)
    return found ? found.name : code
  }

  $: displayValue = readOnly ? formatAmount(value, currency) : value
</script>

<div class="currency-input-wrapper">
  {#if label}
    <span class="input-label">{label}</span>
  {/if}
  <div class="input-group">
    <div class="currency-selector">
      <select value={currency} on:change={handleCurrencyChange} class="currency-select">
        {#each $availableCurrencies as curr (curr.code)}
          <option value={curr.code}>{curr.code} — {curr.name}</option>
        {/each}
      </select>
      <div class="selected-display">
        <span class="currency-code">{currency}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
    <div class="amount-field">
      <span class="symbol">{getCurrencySymbol(currency)}</span>
      <input
        type={readOnly ? 'text' : 'number'}
        class="amount-input"
        value={displayValue}
        readonly={readOnly}
        min="0"
        step="any"
        on:input={handleAmountChange}
      />
    </div>
  </div>
  <span class="currency-name-hint">{getCurrencyName(currency)}</span>
</div>

