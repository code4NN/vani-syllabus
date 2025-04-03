import { createRouter, createWebHashHistory } from 'vue-router';
import { isSessionValid } from "@/utils/auth";


// import auth related routes
import Auth from '@/views/Auth.vue';
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import Profile from '@/components/auth/Profile.vue'

// ===================================
import Home from '@/views/Home.vue';

const routes = [
    { path: '/', redirect: '/auth' },
    {
        path: '/auth', component: Auth,
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: '', redirect: '/auth/login' }
        ]
    },
    { path: '/home', component: Home, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHashHistory(), // Hash mode for GitHub Pages
    routes,
});

// Navigation Guard: Redirect users if they are not logged in
// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !isSessionValid()) {
//         next('/auth'); // Redirect to login if session is invalid
//     } else if (to.path === '/auth' && isSessionValid()) {
//         next('/home'); // Redirect logged-in users to home if they visit auth
//     } else {
//         next(); // Proceed normally
//     }
// });

export default router;