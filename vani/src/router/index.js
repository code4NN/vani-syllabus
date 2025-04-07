import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Auth components
import Auth from '@/views/Auth.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

// Home components
import Home from '@/views/Home.vue'

// ==============================================================================
// Define routes
const routes = [
    { path: '/', redirect: '/auth' },
    {
        path: '/auth',
        component: Auth,
        children: [
            { path: 'register', component: Register },
            { path: 'login', component: Login },
            { path: '', redirect: '/auth/login' }
        ]
    },
    { path: '/home', component: Home }
]

// ==============================================================================
// Create the router instance
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// ==============================================================================
// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const publicPaths = ['/auth/login', '/auth/register']

    if (!publicPaths.includes(to.path) && !auth.isSessionValid) {
        // Block access to all other routes if session is invalid
        next('/auth/login')
    } else {
        next()
    }
})

export default router
