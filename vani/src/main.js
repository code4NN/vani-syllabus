import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For JavaScript components
import './style.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
// import { createPinia } from 'pinia';

const app = createApp(App);
  app.use(router); // Use router in the app
  app.mount('#app');



// if (window.self !== window.top) {
//   console.log("Skipping Vue inside iframe...------------------------------------------------------")
// }
// else {

//   const app = createApp(App);
//   // const pinia = createPinia();
//   app.use(router); // Use router in the app
//   // app.use(pinia);
//   app.mount('#app');
// }