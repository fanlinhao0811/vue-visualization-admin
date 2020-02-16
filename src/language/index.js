import Vue from 'vue';
import VueI18n from 'vue-i18n';

import zh from './zh';
import en from './en';
import ien from 'view-design/dist/locale/en-US';
import izh from 'view-design/dist/locale/zh-CN';

Vue.use(VueI18n);

const messages = {
  zh: {
    ...izh,
    ...zh
  },
  en: {
    ...ien,
    ...en
  }
}

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n;
