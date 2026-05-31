<script>
  import { availableCurrencies } from '../stores.js';
  import { formatNumber } from '../utils/formatters.js';

  export let label = '';
  export let value = 0;
  export let currency = 'USD';
  export let onChange = () => {};
  export let onCurrencyChange = () => {};
  export let readOnly = false;

  let inputValue = '';

  function handleAmountChange(e) {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  }

  function handleCurrencyChange(e) {
    onCurrencyChange(e.target.value);
  }

  $: inputValue = value.toString();
</script>

<div class="currency-input">
  {#if label}
    <label>{label}</label>
  {/if}
  
  <div class="input-group">
    <div class="input-wrapper">
      <input
        type="number"
        placeholder="0.00"
        value={inputValue}
        on:change={handleAmountChange}
        on:input={handleAmountChange}
        {readOnly}
        step="0.01"
        min="0"
        class="amount-input"
      />
      <div class="input-underline"></div>
    </div>
    
    <select 
      value={currency}
      on:change={handleCurrencyChange}
      class="currency-select"
    >
      {#each $availableCurrencies as curr (curr.code)}
        <option value={curr.code}>
          {curr.code}
        </option>
      {/each}
    </select>
  </div>

  {#if !readOnly}
    <div class="currency-hint">
      {#each $availableCurrencies as curr (curr.code)}
        {#if curr.code === currency}
          <small>{curr.symbol} {curr.name}</small>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .currency-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .input-group {
    display: flex;
    gap: 12px;
  }

  .input-wrapper {
    flex: 1;
    position: relative;
  }

  .amount-input {
    width: 100%;
    padding: 16px 18px;
    border: none;
    border-radius: 14px;
    font-size: 1.15rem;
    font-weight: 600;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
    color: #1a1a2e;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    font-variant-numeric: tabular-nums;
  }

  .amount-input::placeholder {
    color: rgba(26, 26, 46, 0.3);
  }

  .amount-input:focus {
    outline: none;
    background: white;
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.2),
      0 0 0 3px rgba(52, 211, 153, 0.2);
  }

  .amount-input:read-only {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.8) 100%);
    cursor: not-allowed;
    color: rgba(26, 26, 46, 0.7);
  }

  .input-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #34d399, #10b981);
    border-radius: 1px;
    transition: width 0.3s ease;
  }

  .amount-input:focus ~ .input-underline {
    width: 100%;
  }

  .currency-select {
    padding: 16px 14px;
    border: none;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 700;
    background-color: white;
    color: #1a1a2e;
    cursor: pointer;
    min-width: 130px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    appearance: none;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%231a1a2e' d='M8 11L3 6h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    padding-right: 32px;
  }

  .currency-select:focus {
    outline: none;
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.2),
      0 0 0 3px rgba(52, 211, 153, 0.2);
  }

  .currency-select:hover:not(:focus) {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.18);
  }

  .currency-hint {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.65);
    padding-left: 2px;
    letter-spacing: 0.2px;
  }

  .currency-hint small {
    display: block;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .input-group {
      gap: 10px;
    }

    .currency-select {
      min-width: 110px;
      padding: 14px 10px;
      padding-right: 28px;
    }

    .amount-input {
      padding: 14px 14px;
      font-size: 1rem;
    }

    label {
      font-size: 0.85rem;
    }
  }
</style>
