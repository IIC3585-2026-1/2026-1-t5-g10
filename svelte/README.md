# MoneyExchange 💱

Aplicación web moderna para conversión de divisas en tiempo real, desarrollada con **Svelte** para la materia "Desarrollo Avanzado de Aplicaciones Web".

## Características ✨

- ✅ **Conversión bidireccional** de múltiples monedas (USD, EUR, MXN, CLP, COP, ARS, BRL, CAD, AUD, JPY, GBP, CHF)
- ✅ **Tasas de cambio en tiempo real** obtenidas de una API pública
- ✅ **Interfaz amigable e intuitiva** con diseño responsivo
- ✅ **Intercambio rápido** de monedas con un solo clic
- ✅ **Actualización automática** de tasas cada 5 minutos
- ✅ **Manejo de estado centralizado** con Svelte Stores
- ✅ **Componentes reutilizables** bien estructurados
- ✅ **Indicador de estado** de actualización

## Estructura del Proyecto 📁

```
moneyexchange/
├── src/
│   ├── components/
│   │   ├── Header.svelte           # Encabezado con botón de actualización
│   │   ├── ConverterCard.svelte    # Card principal de conversión
│   │   ├── CurrencyInput.svelte    # Componente reutilizable de input
│   │   ├── ExchangeRateInfo.svelte # Muestra tasa de cambio actual
│   │   └── UpdateStatus.svelte     # Estado de última actualización
│   ├── services/
│   │   └── currencyService.js      # Lógica de API y conversión
│   ├── stores.js                   # Manejo de estado global (Svelte Stores)
│   ├── App.svelte                  # Componente raíz
│   └── main.js                     # Punto de entrada
├── index.html                      # HTML principal
├── vite.config.js                  # Configuración de Vite
├── package.json                    # Dependencias del proyecto
└── README.md                       # Este archivo

```

## Manejo de Estado 🎯

La aplicación utiliza **Svelte Stores** para un manejo centralizado del estado:

### Stores Implementados:

- **`exchangeRates`**: Objeto con las tasas de cambio actuales
- **`amount`**: Cantidad de dinero a convertir
- **`sourceCurrency`**: Moneda de origen (USD por defecto)
- **`targetCurrency`**: Moneda de destino (MXN por defecto)
- **`loading`**: Estado de carga al actualizar tasas
- **`error`**: Mensaje de error si hay problemas
- **`lastUpdate`**: Timestamp de la última actualización

### Stores Derivados:

- **`convertedAmount`**: Calcula automáticamente la cantidad convertida
- **`currentExchangeRate`**: Tasa de cambio actual entre dos monedas

## Componentes 🧩

### 1. **Header.svelte**
- Título y descripción de la aplicación
- Botón de actualización manual de tasas
- Indicador visual de carga

### 2. **ConverterCard.svelte**
- Interfaz principal de conversión
- Dos CurrencyInput para origen y destino
- Botón de intercambio rápido (⇅)
- Resumen de conversión

### 3. **CurrencyInput.svelte** (Reutilizable)
- Input de cantidad
- Selector de moneda
- Muestra nombre y símbolo de la moneda
- Soporte para lectura (solo lectura)

### 4. **ExchangeRateInfo.svelte**
- Muestra la tasa de cambio actual
- Información sobre actualización automática

### 5. **UpdateStatus.svelte**
- Indicador de última actualización
- Muestra estado de carga
- Muestra mensajes de error si aplica

## Tecnologías Utilizadas 🛠️

- **Svelte 4** - Framework reactivo
- **Vite** - Bundler y dev server
- **Axios** - Cliente HTTP
- **API**: Exchange Rate API (er-api.com)

## Instalación 📦

### Requisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd moneyexchange
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`

4. **Construir para producción**
   ```bash
   npm run build
   ```

5. **Vista previa de producción**
   ```bash
   npm run preview
   ```

## Uso 🚀

1. **Ingresa cantidad**: Escribe la cantidad que deseas convertir en el campo "De"
2. **Selecciona monedas**: Elige la moneda origen y destino
3. **Ve el resultado**: La conversión se calcula automáticamente
4. **Intercambia**: Usa el botón ⇅ para intercambiar rápidamente monedas
5. **Actualiza tasas**: Haz clic en "Actualizar" para obtener tasas en tiempo real

## API Utilizada 🌐

**Exchange Rate API** (https://er-api.com/)
- API gratuita y pública
- Tasas actualizadas
- Sin autenticación requerida
- Respuesta en JSON

## Ejemplo de Respuesta de API

```json
{
  "rates": {
    "USD": 1,
    "EUR": 0.92,
    "MXN": 17.05,
    "CLP": 900,
    ...
  }
}
```

## Características Avanzadas ⭐

### Conversión Bidireccional
Es posible editar el campo de destino y la cantidad de origen se calculará automáticamente.

### Manejo de Errores
- Mensajes claros si la API no está disponible
- Interfaz sigue funcionando con tasas en caché

### Responsive Design
- Optimizado para desktop, tablet y móvil
- Interfaz adaptable a diferentes tamaños de pantalla

### Auto-Actualización
- Las tasas se actualizan automáticamente cada 5 minutos
- Manual refresh disponible en cualquier momento

## Mejoras Futuras 🔮

- [ ] Historial de conversiones
- [ ] Gráficos de tendencias de cambio
- [ ] Notificaciones de cambios significativos
- [ ] Favoritos de pares de monedas
- [ ] Modo oscuro/claro
- [ ] Almacenamiento de preferencias en localStorage
- [ ] Múltiples idiomas

## Autor ✍️

Desarrollado para la materia **Desarrollo Avanzado de Aplicaciones Web (DAAW)**

## Licencia 📄

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Nota**: La aplicación utiliza datos en tiempo real de una API pública. Las tasas se actualizan automáticamente cada 5 minutos. Para producción, considera usar una API con autenticación y mayor estabilidad.
