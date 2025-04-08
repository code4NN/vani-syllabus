<script setup>
import { ref } from "vue";
import { register } from "@/utils/server"; // ← adjust to your actual path

const username = ref("");
const password = ref("");

const isLoading = ref(false);
const isRegistered = ref(false);
const usernameError = ref("");
const passwordError = ref("");
const existingUsernames = ref([]);

const validate = () => {
  usernameError.value = "";
  passwordError.value = "";

  const u = username.value;
  const p = password.value;

  if (u.length < 3) {
    usernameError.value = "Username must be at least 3 characters";
  } else if (!/^[a-zA-Z0-9]+$/.test(u)) {
    usernameError.value = "Only letters and numbers allowed";
  } else if (u.toLowerCase() === "guest") {
    usernameError.value = "Reserved username";
  }

  if (p.length < 5) {
    passwordError.value = "Password must be at least 5 characters";
  } else if (/\s/.test(p)) {
    passwordError.value = "No spaces allowed";
  }

  return !(usernameError.value || passwordError.value);
};

const registerNow = async () => {
  if (!validate()) return;

  isLoading.value = true;
  existingUsernames.value = [];

  const response = await register({
    username: username.value,
    password: password.value,
  });

  if (response?.is_success) {
    alert("Registration successful!");
    // Optional: route to login or home
  } else {
    if (response.obstacle === "username") {
      existingUsernames.value = response.existing_userlist || [];
    } else {
      alert("Registration failed. " + (response?.error || "Unknown error"));
    }
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="flex flex-column justify-content-center align-items-center card p-4">
    <h3 class="mb-4">Register</h3>
    <!-- ✅ Success Page -->
    <div v-if="isRegistered" class="alert alert-success">
      <h4 class="alert-heading">Registration Successful!</h4>
      <p>
        Welcome aboard, <strong>{{ username }}</strong> 🎉
      </p>
      <hr />
      <p class="mb-0">You can now log in and start using the app.</p>
    </div>

    <!-- 🧾 Registration Form -->
    <div v-else>
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          :disabled="isLoading"
          placeholder="Enter username"
        />
        <div v-if="usernameError" class="text-danger mt-1">{{ usernameError }}</div>
        <div v-if="existingUsernames.includes(username)" class="text-danger mt-1">
          username already exists
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          :disabled="isLoading"
          class="form-control"
        />
        <div v-if="passwordError" class="text-danger mt-1">{{ passwordError }}</div>
      </div>

      <button class="btn btn-primary" @click="registerNow" :disabled="isLoading">
        {{ isLoading ? "Registering..." : "Register Now" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: auto;
}
</style>
