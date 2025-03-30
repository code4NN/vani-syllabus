<script setup>
import { ref, onMounted } from "vue";
import ServerIframe from "../components/serverIframe.vue";

const serverRef = ref(null);

const fetchData = () => {
    if (serverRef.value?.isReady) {
        serverRef.value.sendMessageToIframe({ action: "getData" });
    } else {
        console.warn("Server not ready yet!");
    }
};

onMounted(() => {
    if (serverRef.value) {
        serverRef.value.listenForIframeResponse((data) => {
            console.log("Received from server:", data);
        });
    }
});
</script>

<template>
    <ServerIframe ref="serverRef" />
    <button @click="fetchData">Fetch Data</button>
</template>
