<script>
  import { amount, sourceCurrency, targetCurrency, convertedAmount } from '../stores.js';
  import { formatNumber } from '../utils/formatters.js';
  import CurrencyInput from './CurrencyInput.svelte';

  function swapCurrencies() {
    const temp = $sourceCurrency;
    sourceCurrency.set($targetCurrency);
    targetCurrency.set(temp);
  }

  function handleAmountChange(newAmount) {
    amount.set(newAmount);
  }

  function handleSourceCurrencyChange(newCurrency) {
    sourceCurrency.set(newCurrency);
  }

  function handleTargetCurrencyChange(newCurrency) {
    targetCurrency.set(newCurrency);
  }

  function handleConvertedAmountChange(newAmount) {
    // Calcular el nuevo amount basado en el converted amount
    const rate = $convertedAmount / $amount;
    amount.set(newAmount / rate);
  }

  $: formattedSource = formatNumber($amount, 2);
  $: formattedTarget = formatNumber($convertedAmount, 2);
</script>

<div class="converter-card">
  <div class="card-content">
    <CurrencyInput
      label="De"
      value={$amount}
      currency={$sourceCurrency}
      onChange={handleAmountChange}
      onCurrencyChange={handleSourceCurrencyChange}
    />

    <button class="swap-btn" on:click={swapCurrencies} title="Intercambiar monedas">
      <span class="swap-icon">⇅</span>
    </button>

    <CurrencyInput
      label="Para"
      value={$convertedAmount}
      currency={$targetCurrency}
      onChange={handleConvertedAmountChange}
      onCurrencyChange={handleTargetCurrencyChange}
      readOnly={false}
    />
  </div>

  <div class="conversion-details">
    <p class="conversion-text">
      <span class="amount-highlight">{formattedSource}</span>
      <span class="currency-code">{$sourceCurrency}</span>
      <span class="equals">=</span>
      <span class="amount-highlight">{formattedTarget}</span>
      <span class="currency-code">{$targetCurrency}</span>
    </p>
  </div>
</div>

<style>
  .converter-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 24px;
    padding: 48px 36px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 1px 1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideUp 0.5s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 28px;
  }

  .swap-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  .swap-btn:hover {
    background: white;
    transform: translateY(-50%) scale(1.12) rotate(180deg);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }

  .swap-btn:active {
    transform: translateY(-50%) scale(0.96);
  }

  .conversion-details {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .conversion-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.05rem;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .amount-highlight {
    color: #34d399;
    font-weight: 700;
    font-size: 1.2rem;
    font-variant-numeric: tabular-nums;
  }

  .currency-code {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .equals {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    margin: 0 4px;
  }

  @media (max-width: 768px) {
    .converter-card {
      padding: 32px 24px;
    }

    .card-content {
      gap: 18px;
      margin-bottom: 20px;
    }

    .swap-btn {
      right: 12px;
      width: 44px;
      height: 44px;
      font-size: 1.1rem;
    }

    .conversion-text {
      font-size: 0.95rem;
      gap: 8px;
    }

    .amount-highlight {
      font-size: 1.1rem;
    }
  }
</style>
