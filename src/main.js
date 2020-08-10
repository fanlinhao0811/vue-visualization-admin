import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import VueI18n from 'vue-i18n';
import router from './router'

import 'view-design/dist/styles/iview.css';

window.Vue = Vue; // 在实例化之前执行
window.$ = require('jquery');
window.joint = require('jointjs');

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界'
      }
    }
  }
})

Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
