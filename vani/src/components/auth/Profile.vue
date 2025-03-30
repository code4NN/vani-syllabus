<script setup>
import { ref } from 'vue';
import { clearUserSession } from '../../utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem('user')));

const logout = () => {
    clearUserSession();
    router.push('/auth');
};
</script>

<template>
    <div class="p-6 bg-gray-100 rounded shadow-md w-80 text-center">
        <h2 class="text-2xl font-bold mb-4">Profile</h2>
        <p class="mb-2"><strong>Username:</strong> {{ user?.username || 'Guest' }}</p>
        <button @click="logout" class="w-full p-2 bg-red-500 text-white rounded">Logout</button>
    </div>
</template>
