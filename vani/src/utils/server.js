// utils/server.js

import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_URL


// Helper: Converts object to query string
function toQueryParams(params = {}) {
    return new URLSearchParams(params).toString()
}

// Core API handler
export async function apiCall({ method = 'GET', action_type, payload = {}, tokenRequired = true }) {
    const auth = useAuthStore()

    if (tokenRequired && !auth.isSessionValid) {
        throw new Error('User session invalid or expired.')
    }

    const finalPayload = {
        ...payload,
        action_type,
        ...(tokenRequired ? { user_token: auth.user.token } : {}),
    }

    if (method === 'GET') {
        const query = toQueryParams(finalPayload)
        const res = await fetch(`${BASE_URL}?${query}`)
        return await res.json()
    }

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
    })

    return await res.json()
}


export function login(payload) {
    return apiCall({ method: 'POST', action_type: 'login', payload, tokenRequired: false })
}

export function register(payload) {
    return apiCall({ method: 'POST', action_type: 'register', payload, tokenRequired: false })
}

export function getData(action_type, payload = {}) {
    return apiCall({ method: 'GET', action_type, payload, tokenRequired: true })
}

export function postData(action_type, payload = {}) {
    return apiCall({ method: 'POST', action_type, payload, tokenRequired: true })
}

// export function dataFetch(batch = []) {
//     return apiCall({ method: 'POST', action_type: 'data_fetch', payload: { batch }, tokenRequired: true })
// }
