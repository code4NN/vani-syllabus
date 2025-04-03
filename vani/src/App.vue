<script setup>
import { provide, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { isSessionValid } from "@/utils/auth";

const router = useRouter();
const route = useRoute();

console.log("🟢 App.vue setup() called"); // Ensures this runs only once

onMounted(() => {
  if (!isSessionValid()) {
    // Redirect to login if the session is invalid
    if (route.meta.requiresAuth) {
      router.replace("/auth");
    }
  } else {
    // Redirect logged-in users away from auth pages
    if (route.path.startsWith("/auth")) {
      router.replace("/home");
    }
  }
});
</script>

<template>
  <router-view />
</template>
