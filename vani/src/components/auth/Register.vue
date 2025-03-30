<script setup>
import { ref } from 'vue';

defineProps(['switchView']);

const username = ref('');
const password = ref('');

const register = () => {
    if (username.value && password.value) {
        alert('Registration successful! Please log in.');
        username.value = '';
        password.value = '';
    } else {
        alert('Please enter all details.');
    }
};
</script>

<template>
    <div class="p-6 bg-gray-100 rounded shadow-md w-80">
        <h2 class="text-2xl font-bold mb-4">Register</h2>
        <input v-model="username" type="text" placeholder="Username" class="w-full p-2 mb-2 border rounded">
        <input v-model="password" type="password" placeholder="Password" class="w-full p-2 mb-2 border rounded">
        <button @click="register" class="w-full p-2 bg-green-500 text-white rounded">Register</button>
        <p class="mt-2 text-sm">
            Already have an account? 
            <button @click="$emit('switchView', 'login')" class="text-blue-500 underline">Login</button>
        </p>
    </div>
</template>
