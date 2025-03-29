import { createRouter, createWebHashHistory } from 'vue-router'; // Use Hash Mode for GitHub Pages
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Profile from '../components/auth/Profile.vue';

const routes = [
    { path: '/', component: Login }, // Default page is Login
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
];

const router = createRouter({
    history: createWebHashHistory(), // Use hash mode for GitHub Pages
    routes,
});

export default router;