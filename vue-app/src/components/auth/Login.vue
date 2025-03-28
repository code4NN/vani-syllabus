<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
  console.log('Logging in with:', { email: email.value, password: password.value });
  console.log('it is working');
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label for="password" class="block font-medium">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>