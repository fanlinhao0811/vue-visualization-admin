import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import i18n from './language';

import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
});

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
