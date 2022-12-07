import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import App from './App.vue';
import firebaseApp from '../db';
import './assets/styles/reset.css';

const app = createApp(App);
app.use(firebaseApp);
app.use(VueAxios, axios);
app.use(createPinia());
app.provide('axios', app.config.globalProperties.axios);
app.mount('#app');
