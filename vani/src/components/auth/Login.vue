<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { setUserSession } from "../../utils/auth";

defineProps({
  switchView: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  if (username.value && password.value) {
    setUserSession({ username: username.value });
    router.push("/home");
  } else {
    alert("Please enter credentials.");
  }
};
</script>

<template>
  <div class="p-6 bg-gray-100 rounded shadow-md w-80">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <input
      v-model="username"
      type="text"
      placeholder="Username"
      class="w-full p-2 mb-2 border rounded"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full p-2 mb-2 border rounded"
    />
    <button @click="login" class="w-full p-2 bg-blue-500 text-white rounded">
      Login
    </button>
    
    <p class="mt-2 text-sm">
      Don't have an account?
      <button @click="$emit('switchView', 'register')" class="text-blue-500 underline">
        Register
      </button>
    </p>
  </div>
</template>
