import { createApp } from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Field, Form, ErrorMessage,
  defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zhTw from '@vee-validate/i18n/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';

// Vee rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

// Vee Config
configure({
  generateMessage: localize('zh', zhTw),
  validateOnInput: true,
});

// Main App
const app = createApp(App);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
