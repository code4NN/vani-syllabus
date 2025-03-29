// Profile.vue
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 class="text-2xl font-bold">Welcome to your profile</h2>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push('/');
};
</script>