<script setup>
import { ref, computed, reactive, inject } from "vue";

const sendRequest = inject("sendRequest");
const username = ref("");
const password = ref("");
const showPassword = ref(false);
const login_progress_status = reactive({ hasError: false, msg: "" });

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (!username.value || !password.value) {
    login_progress_status.msg = "Both fields are required!";
    login_progress_status.hasError = true;
    return;
  }

  try {
    login_progress_status.hasError = false;
    login_progress_status.msg = "Validating...";

    const response = await sendRequest("login", {
      username: username.value,
      password: password.value,
    });
    
    console.log("Response received from iframe", response)
    
  } catch (error) {
    login_progress_status.msg = "Error communicating with server";
    login_progress_status.hasError = true;
    console.error(error);
  }
};

const allowSubmit = computed(() => {
  return username.value && password.value;
});
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-6">
      <div class="card p-4">
        <h3 class="mb-4 text-center">Login</h3>
        <form @submit.prevent="handleLogin(false)">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <div class="input-group">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                @click="togglePassword"
                class="btn btn-outline-secondary"
              >
                {{ showPassword ? "Hide" : "Show" }}
              </button>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <h5
              v-if="login_progress_status.haserror"
              class="text-danger justify-content-center"
            >
              {{ login_progress_status.msg }}
            </h5>
            <button v-if="!allowSubmit" type="submit" class="btn btn-danger" disabled>
              cannot Login
            </button>
            <button
              v-else-if="username === 'guest' && password === 'guest'"
              type="submit"
              class="btn btn-warning"
            >
              Login as guest
            </button>
            <button v-else type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  margin: auto;
}
</style>
