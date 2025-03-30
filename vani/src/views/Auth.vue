<script setup>
import { ref } from "vue";
import ServerIframe from "../components/serverIframe.vue";

const serverRef = ref(null);

const login = () => {
    if (serverRef.value?.isReady) {
        serverRef.value.sendMessageToIframe({ action: "login", username: "testUser", password: "testPass" });
    } else {
        console.warn("Server not ready yet!");
    }
};
</script>

<template>
    <ServerIframe ref="serverRef" />
    <div class="flex flex-col items-center space-y-4">
        <h1 class="text-xl font-bold">Login</h1>
        <button @click="login" class="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
    </div>
</template>
