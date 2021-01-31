import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import longTapDirective from '@/directives/long-tap'
import router from './router'

const longTapInstance = longTapDirective({delay: 800})
Vue.directive('longtappable', longTapInstance)


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
