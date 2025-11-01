import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // if using icons
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// main.js
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#945034',
          secondary: '#f5f0e6',
          surface: '#fff',
          onPrimary: '#fff',
          onSecondary: '#333',
        },
      },
    },
  },
  defaults: {
    global: {
      font: { family: 'Lato' }, // ensures all components use Lato by default
    },
  },
  typography: {
    h1: { fontFamily: 'Montserrat', fontWeight: 700 },
    h2: { fontFamily: 'Montserrat', fontWeight: 900 },
    h3: { fontFamily: 'Montserrat', fontWeight: 700 },
    h4: { fontFamily: 'Montserrat', fontWeight: 700 },
    h5: { fontFamily: 'Montserrat', fontWeight: 700 },
    h6: { fontFamily: 'Montserrat', fontWeight: 700 },
    subtitle1: { fontFamily: 'Lato', fontWeight: 400 },
    body1: { fontFamily: 'Lato', fontWeight: 400 },
    body2: { fontFamily: 'Lato', fontWeight: 400 },
  },
})

createApp(App)
  .use(vuetify)
  .mount('#app')