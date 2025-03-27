<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 class="text-2xl font-bold">Register</h2>
    <form @submit.prevent="register" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="p-2 border rounded" required />
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
    <router-link to="/" class="text-blue-500">Login</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = () => {
  if (email.value && password.value) {
    router.push('/profile');
  }
};
</script>