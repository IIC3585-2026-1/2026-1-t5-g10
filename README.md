# MoneyExchange 💱

**Tarea 5: Frameworks — Grupo 10**
Integrantes: Nicolás Añazco, Gustavo Gonzales y Sofía Briseño

Aplicación web para conversión de divisas en tiempo real, implementada **dos veces** con frameworks distintos para comparar enfoques de desarrollo frontend.

| | Svelte | Vue |
|---|---|---|
| Framework | Svelte 4 | Vue 3 (Composition API) |
| Estado | Svelte Stores | Pinia |
| Puerto dev | 5173 | 5174 |
| Carpeta | `svelte/` | `Vue/` |

## Características de la App ✨

Ambas implementaciones tienen las mismas funcionalidades:

- **Conversión en tiempo real** entre 30 monedas de todo el mundo
- **Tasas en vivo** desde Exchange Rate API, con auto-actualización cada 5 minutos
- **Intercambio rápido** de monedas con un clic (⇅)
- **Formato inteligente de números** con `Intl.NumberFormat` según la moneda (ej: JPY y CLP sin decimales)
- **Historial de conversiones** — guarda hasta 8 conversiones recientes con hora
- **Gráfico histórico 30 días** — evolución de la tasa del par seleccionado, se actualiza reactivamente al cambiar monedas
- **Diseño responsivo** para desktop, tablet y móvil
- **Manejo de errores** con mensajes claros al usuario

### Monedas disponibles (30)

| Región | Monedas |
|---|---|
| Américas | USD, CAD, MXN, CLP, COP, ARS, BRL, PEN, UYU |
| Europa | EUR, GBP, CHF, SEK, NOK, DKK, PLN, TRY |
| Asia-Pacífico | JPY, CNY, KRW, HKD, SGD, AUD, NZD, INR, THB |
| Medio Oriente y África | AED, SAR, ILS, ZAR |

## Estructura del Repositorio 📁

```
Tarea 5 - Frameworks/
├── shared/
│   └── styles/                     # Estilos compartidos entre ambas apps
│       ├── globals.css             # Variables CSS, reset, fondo
│       ├── header.css
│       ├── converter-card.css
│       ├── currency-input.css
│       ├── exchange-rate.css
│       ├── update-status.css
│       ├── rate-chart.css          # Estilos del gráfico histórico
│       └── conversion-history.css  # Estilos del historial
├── svelte/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.svelte
│   │   │   ├── ConverterCard.svelte
│   │   │   ├── CurrencyInput.svelte
│   │   │   ├── ExchangeRateInfo.svelte
│   │   │   ├── UpdateStatus.svelte
│   │   │   ├── RateChart.svelte    # Gráfico histórico 30 días (Chart.js directo)
│   │   │   └── ConversionHistory.svelte
│   │   ├── services/
│   │   │   └── currencyService.js  # fetchExchangeRates + fetchHistoricalRates
│   │   ├── styles/
│   │   │   ├── app.css             # Layout específico de Svelte
│   │   │   ├── RateChart.css
│   │   │   └── ConversionHistory.css
│   │   ├── utils/
│   │   │   └── formatters.js       # formatAmount con Intl.NumberFormat
│   │   ├── stores.js               # Estado global (Svelte Stores)
│   │   ├── App.svelte
│   │   └── main.js
│   └── package.json
├── Vue/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.vue
│   │   │   ├── ConverterCard.vue
│   │   │   ├── CurrencyInput.vue
│   │   │   ├── ExchangeRateInfo.vue
│   │   │   ├── UpdateStatus.vue
│   │   │   ├── RateChart.vue       # Gráfico histórico 30 días (vue-chartjs)
│   │   │   └── ConversionHistory.vue
│   │   ├── services/
│   │   │   └── currencyService.js  # fetchExchangeRates + fetchHistoricalRates
│   │   ├── stores/
│   │   │   └── currencyStore.js    # Estado global (Pinia) + formatAmount
│   │   ├── styles/
│   │   │   └── app.css             # Layout específico de Vue
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
└── README.md
```

## Instalación y Ejecución 📦

### Requisitos
- Node.js 16+
- npm

### Correr una sola implementación

```bash
# Svelte → http://localhost:5173
cd svelte
npm install
npm run dev

# Vue → http://localhost:5174
cd Vue
npm install
npm run dev
```

### Correr ambas al mismo tiempo

Abre dos terminales:

```bash
# Terminal 1
cd svelte && npm run dev

# Terminal 2
cd Vue && npm run dev
```

### Build para producción

```bash
npm run build    # en cualquiera de las dos carpetas
npm run preview  # para previsualizar el build
```

## Componentes 🧩

Ambas apps tienen los mismos 7 componentes con responsabilidades equivalentes:

| Componente | Descripción |
|---|---|
| `Header` | Título, botón de actualización manual e indicador de carga |
| `ConverterCard` | Interfaz principal con inputs y botón de intercambio |
| `CurrencyInput` | Input reutilizable con selector de moneda |
| `ExchangeRateInfo` | Muestra la tasa de cambio actual e inversa |
| `UpdateStatus` | Estado de última actualización y errores |
| `RateChart` | Gráfico de línea con la evolución de la tasa en los últimos 30 días |
| `ConversionHistory` | Lista de conversiones guardadas manualmente |

## Manejo de Estado 🎯

### Svelte — Stores nativos

```js
// stores.js
export const amount = writable(100)
export const sourceCurrency = writable('USD')
export const convertedAmount = derived(...)
export const conversionHistory = writable([])
export function addToHistory() { ... }
```

### Vue — Pinia

```js
// stores/currencyStore.js
export const useCurrencyStore = defineStore('currency', () => {
  const amount = ref(100)
  const sourceCurrency = ref('USD')
  const convertedAmount = computed(...)
  const conversionHistory = ref([])
  function addToHistory() { ... }
})
```

## APIs Utilizadas 🌐

### Tasas en tiempo real

**Open Exchange Rate API** — `https://open.er-api.com/v6/latest/USD`

- Gratuita y pública, sin autenticación
- Tasas actualizadas en JSON

### Historial de tasas (gráfico 30 días)

**Fawazahmed0 Currency API** — `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{fecha}/v1/currencies/{moneda}.min.json`

- Gratuita, sin autenticación, servida por jsDelivr
- Cubre todas las monedas disponibles incluyendo CLP, ARS y COP
- Se consultan ~10 fechas distribuidas en 30 días en paralelo

## Diferencias de implementación entre frameworks

| Aspecto | Svelte | Vue |
| --- | --- | --- |
| Gráfico | Chart.js directo con `bind:this` en canvas | vue-chartjs (wrapper reactivo) |
| Estado derivado | `derived()` store | `computed()` |
| Reactividad en gráfico | `$: if (canvas) loadChart(...)` | `watch()` sobre par de monedas |
| Formato de números | `formatAmount` en `utils/formatters.js` | `formatAmount` exportado desde el store |
