// import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For JavaScript components
import './style.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
app.use(router); // Use router in the app
app.use(pinia);

if (window.__APP_MOUNTED__) {
  console.warn("⚠️ App is already mounted. Skipping re-mount.");
} else {
  window.__APP_MOUNTED__ = true;
  console.log("🔵 Mounting App.vue");
  app.mount('#app');
}

