import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

AOS.init({
  duration: 900,
  easing: 'ease-out-cubic',
  once: false,
  offset: 20,
})

router.afterEach(() => {
  setTimeout(() => AOS.refreshHard(), 80)
})

