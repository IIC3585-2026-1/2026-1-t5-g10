import App from './App.svelte'
import '../../shared/styles/globals.css'
import '../../shared/styles/header.css'
import '../../shared/styles/converter-card.css'
import '../../shared/styles/currency-input.css'
import '../../shared/styles/exchange-rate.css'
import '../../shared/styles/update-status.css'
import './styles/app.css'

const app = new App({
  target: document.getElementById('app'),
})

export default app
