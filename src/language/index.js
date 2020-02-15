import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    zh: {
      message: {
        hello: '你好、世界'
      }
    }
  }
})

export default i18n;
