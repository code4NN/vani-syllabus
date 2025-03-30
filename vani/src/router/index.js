import { createRouter, createWebHashHistory } from 'vue-router';
import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import { isSessionValid } from '../utils/auth'; // Import session check function

const routes = [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: Auth },
    { path: '/home', component: Home, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHashHistory(), // Hash mode for GitHub Pages
    routes,
});

// Navigation Guard: Redirect users if they are not logged in
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isSessionValid()) {
        next('/auth'); // Redirect to login if session is invalid
    } else if (to.path === '/auth' && isSessionValid()) {
        next('/home'); // Redirect logged-in users to home if they visit auth
    } else {
        next(); // Proceed normally
    }
});

export default router;