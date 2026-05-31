<script>
  import { currentExchangeRate, sourceCurrency, targetCurrency } from '../stores.js';
  import { formatRate } from '../utils/formatters.js';
</script>

<div class="exchange-rate-info">
  <h3>Tasa de Cambio</h3>
  
  <div class="rate-display">
    <div class="rate-item">
      <span class="rate-label">1</span>
      <span class="rate-code">{$sourceCurrency}</span>
      <span class="rate-value">=</span>
      <span class="rate-amount">{formatRate($currentExchangeRate)}</span>
      <span class="rate-code">{$targetCurrency}</span>
    </div>
  </div>

  <div class="info-note">
    <p>Tasas actualizadas automáticamente</p>
  </div>
</div>

<style>
  .exchange-rate-info {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 24px;
    padding: 28px 32px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 1px 1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideUp 0.5s ease-out 0.1s both;
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

  h3 {
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 18px 0;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .rate-display {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }

  .rate-item {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .rate-label {
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .rate-code {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .rate-value {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
  }

  .rate-amount {
    color: #34d399;
    font-size: 1.25rem;
    font-weight: 700;
    background: rgba(52, 211, 153, 0.1);
    padding: 8px 14px;
    border-radius: 10px;
    font-variant-numeric: tabular-nums;
    border: 1px solid rgba(52, 211, 153, 0.2);
  }

  .info-note {
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .info-note p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    margin: 0;
    font-weight: 500;
    letter-spacing: 0.2px;
  }

  @media (max-width: 768px) {
    .exchange-rate-info {
      padding: 20px 24px;
    }

    h3 {
      font-size: 1rem;
      margin-bottom: 14px;
    }

    .rate-item {
      gap: 8px;
    }

    .rate-amount {
      font-size: 1.1rem;
      padding: 6px 12px;
    }

    .info-note p {
      font-size: 0.8rem;
    }
  }
</style>
