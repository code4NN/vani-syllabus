<script setup>
import { ref, computed, onMounted } from "vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Profile from "../components/auth/Profile.vue";
import { isSessionValid } from "../utils/auth"; // Import session check function

const is_authenticated = ref(false);
const currentView = ref("login"); // Default view

onMounted(() => {
  is_authenticated.value = isSessionValid();
});
// Function to switch views
const setView = (view) => {
  currentView.value = view;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
      <template v-if="is_authenticated">
        <Profile @logout="is_authenticated = false" />
      </template>

      <template v-else>
        <Login v-if="currentView === 'login'" @switch="setView" />
        <Register v-else-if="currentView === 'register'" @switch="setView" />
      </template>
    </div>
  </div>
</template>
