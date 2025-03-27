import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Profile from './components/auth/Profile.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;