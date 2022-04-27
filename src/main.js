import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/assets/styles/reset.css';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(createPinia());
app.provide('axios', app.config.globalProperties.axios);
app.mount('#app');
