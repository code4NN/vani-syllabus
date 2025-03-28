<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 class="text-2xl font-bold">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded" required />
        <input v-model="password" type="password" placeholder="Password" class="p-2 border rounded" required />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
      <router-link to="/register" class="text-blue-500">Register</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const login = () => {
    if (email.value && password.value) {
      router.push('/profile');
    }
  };
  </script>