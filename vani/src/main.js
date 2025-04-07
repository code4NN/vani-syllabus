import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For JavaScript components
import './style.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth'
import router from './router';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia(); 
app.use(pinia);

const auth = useAuthStore()
auth.loadFromStorage()

app.use(router);

app.mount('#app');