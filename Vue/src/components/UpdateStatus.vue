<script>
import { useCurrencyStore } from '../stores/currencyStore'

export default {
  name: 'UpdateStatus',
  setup() {
    const store = useCurrencyStore()
    return { store }
  }
}
</script>

<template>
  <div class="status-bar">
    <div class="error-msg" v-if="store.error">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ store.error }}
    </div>

    <div class="update-time" v-if="store.formattedLastUpdate && !store.error">
      <span class="dot"></span>
      Actualizado a las {{ store.formattedLastUpdate }}
    </div>
    <div class="update-time pending" v-else-if="!store.error">
      Cargando tasas...
    </div>
  </div>
</template>

<style src="../../../shared/styles/update-status.css"></style>
