<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Check if we're on the login or register page
const isLogin = computed(() => route.path === "/auth/login");
const isProfile = computed(() => route.path === "/auth/profile");

// Navigate between login and register
const switchAuthView = () => {
  router.push(isLogin.value ? "/auth/register" : "/auth/login");
};
</script>

<template>
  <div class="d-flex flex-column p-2">
    <router-view />
    
    <!-- Renders Login.vue or Register.vue -->
    <div class="d-flex justify-content-center mt-3">
      <button
        class="btn"
        :class="isLogin ? 'btn-primary' : 'btn-success'"
        @click="switchAuthView"
        v-if="!isProfile"
      >
        {{ isLogin ? "Create an Account" : "Go to Login" }}
      </button>
    </div>
  </div>
</template>
