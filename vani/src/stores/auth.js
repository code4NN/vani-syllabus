import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Constants
const AUTH_STORAGE_KEY = 'auth_user'
const TOKEN_STORAGE_KEY = 'auth_token'
const LAST_LOGIN_KEY = 'auth_last_login'

// Expiry: e.g., 24 hours
const LOGIN_EXPIRY_HOURS = 24 * 4
const LOGIN_EXPIRY_MS = LOGIN_EXPIRY_HOURS * 60 * 60 * 1000

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)
    const lastLogin = ref(null)

    // ✅ Computed getter for session validity
    const isSessionValid = computed(() => {
        if (!lastLogin.value) return false
        const now = Date.now()
        return now - lastLogin.value < LOGIN_EXPIRY_MS
    })

    // ✅ Get feature from user
    const getFeature = (key) => {
        return user.value?.features?.[key] ?? null
    }

    // ✅ Set feature to user
    const setFeature = (key, value) => {
        if (!user.value) return
        if (!user.value.features) user.value.features = {}
        user.value.features[key] = value
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user.value))
    }

    // ✅ Save all to localStorage
    const persistToStorage = () => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user.value))
        localStorage.setItem(TOKEN_STORAGE_KEY, token.value)
        localStorage.setItem(LAST_LOGIN_KEY, Date.now().toString())
    }

    // ✅ Load from localStorage
    const loadFromStorage = () => {
        const userRaw = localStorage.getItem(AUTH_STORAGE_KEY)
        const tokenRaw = localStorage.getItem(TOKEN_STORAGE_KEY)
        const lastLoginRaw = localStorage.getItem(LAST_LOGIN_KEY)

        if (userRaw && tokenRaw && lastLoginRaw) {
            const parsedUser = JSON.parse(userRaw)
            const parsedLogin = parseInt(lastLoginRaw)

            user.value = parsedUser
            token.value = tokenRaw
            lastLogin.value = parsedLogin
        }
    }

    // ✅ Set auth info
    const setAuth = (userData, tokenValue) => {
        user.value = userData
        token.value = tokenValue
        lastLogin.value = Date.now()
        persistToStorage()
    }

    // ✅ Logout
    const logout = () => {
        user.value = null
        token.value = null
        lastLogin.value = null
        localStorage.clear()
    }

    // // ✅ Update profile and sync
    // const updateProfile = (updates) => {
    //     if (!user.value) return
    //     user.value = { ...user.value, ...updates }
    //     persistToStorage()
    // }

    return {
        user,
        token,
        lastLogin,
        isSessionValid,
        getFeature,
        setFeature,
        setAuth,
        loadFromStorage,
        logout,
        // updateProfile,
    }
})
