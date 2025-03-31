<script setup>
import { provide, onMounted, ref } from "vue";

console.log("🟢 App.vue setup() called"); // Ensures this runs only once

const iframe = ref(null);
const pendingRequests = new Map();

const init = () => {
  console.log("🔵 init() function called");

  if (iframe.value) {
    console.warn("⚠️ init() called again, but iframe already exists. Skipping...");
    return;
  }

  iframe.value = document.getElementById("server-iframe");

  if (!iframe.value) {
    console.error("❌ Iframe element not found!");
    return;
  }

  console.log("✅ Iframe found. Setting up event listener.");

  window.addEventListener("message", handleMessage, false);
};

// **Send request to iframe**
const sendRequest = (action, payload = {}) => {
  return new Promise((resolve, reject) => {
    if (!iframe.value || !iframe.value.contentWindow) {
      console.error("❌ sendRequest failed: Iframe not ready.");
      reject("Iframe not ready");
      return;
    }

    const requestId = Date.now() + Math.random();
    pendingRequests.set(requestId, { resolve, reject });

    console.log(`📤 Sending request to iframe:`, { action, payload, requestId });
    iframe.value.contentWindow.postMessage({ action, payload, requestId }, "*");

    // Timeout to prevent infinite waiting
    setTimeout(() => {
      if (pendingRequests.has(requestId)) {
        console.error("⏳ Timeout: No response from iframe.");
        pendingRequests.get(requestId).reject("No response received");
        pendingRequests.delete(requestId);
      }
    }, 10000);
  });
};

// **Handle messages from iframe**
const handleMessage = (event) => {
  console.log("📥 Message received from iframe:", event.data);
  console.log("🌍 Event origin:", event.origin);
  console.log("🎯 Expected origin:", new URL(iframe.value.src).origin);

  if (event.origin !== new URL(iframe.value.src).origin) {
    console.warn("⚠️ Message origin mismatch! Ignoring message.");
    return;
  }

  if (!event.data.requestId) {
    console.warn("⚠️ Message received without requestId. Ignoring.");
    return;
  }

  const { requestId, success, data, error } = event.data;

  console.log("🗂 Checking pendingRequests queue:", pendingRequests);

  if (pendingRequests.has(requestId)) {
    console.log(`✅ Resolving request ${requestId}`);
    const { resolve, reject } = pendingRequests.get(requestId);
    pendingRequests.delete(requestId);

    success ? resolve(data) : reject(error);
  } else {
    console.warn(
      `⚠️ requestId ${requestId} not found in pendingRequests. Possible duplicate message?`
    );
  }
};

// **Provide sendRequest globally**
provide("sendRequest", sendRequest);
console.log("🟢 sendRequest function provided globally.");

onMounted(() => {
  console.log("🟢 App.vue onMounted() triggered.");
  init();
});
</script>

<template>
  <router-view />
</template>
