<script setup>
import { provide, onMounted, ref } from "vue";
import { useQueueStore } from "@/store/queue";

console.log("🟢 App.vue setup() called"); // Ensures this runs only once

const iframe = ref(null);
const queueStore = useQueueStore();

const init = () => {
  console.log("🔵 init() function called");

  const my_iframe = document.createElement("iframe");
  my_iframe.id = "server-iframe";
  my_iframe.src =
    "https://script.google.com/macros/s/AKfycbzLwkVy1Jr-ChMEm-NBKt534grz43lxbVRgFBuZOQAafox5ZhBWrYFGtY33hW5keYdFFg/exec";
  // my_iframe.src = "@/components/test_server.html";
  my_iframe.style.display = "none";
  document.body.appendChild(my_iframe);

  my_iframe.onload = () => {
    // The iframe has loaded successfully, now you can safely interact with it
    
    // Now you can assign the iframe reference
    
    console.log("Iframe loaded");
    iframe.value = document.getElementById("server-iframe");
    console.log("✅ Iframe found. Setting up event listener.");
    window.addEventListener("message", handleMessage, false);
  };
};

// **Send request to iframe**
const sendRequest = (actionId, payload = {}) => {
  return new Promise((resolve, reject) => {
    if (!iframe.value || !iframe.value.contentWindow) {
      console.error("❌ sendRequest failed: Iframe not ready.");
      reject("Iframe not ready");
      return;
    }

    const requestId = Date.now() + Math.random();
    queueStore.addRequest({ requestId, resolve, reject });

    console.log(`📤 Sending request to iframe:`, { actionId, payload, requestId });
    // const iframeHost = new URL(iframe.value.contentWindow.location).origin;
    const iframeHost = "https://n-wwjgk6vnhegpyjmswp3olzlfimqvwm2k5q4pdsa-0lu-script.googleusercontent.com";
    // const iframeHost = "https://n-wwjgk6vnhegpyjmswp3olzlfimqvwm2k5q4pdsa-0lu-script.googleusercontent.com";
    // const iframeHost = "*";
    iframe.value.contentWindow.postMessage({ actionId, payload, requestId }, iframeHost);

    // Timeout to prevent infinite waiting
    setTimeout(() => {
      if (queueStore.getRequest(requestId)) {
        console.error("⏳ Timeout: No response from iframe.");
        queueStore.getRequest(requestId).reject("No response received");
        queueStore.removeRequest(requestId);
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

  console.log("🗂 Checking requestQueue in store:", queueStore.requestQueue);

  const request = queueStore.getRequest(requestId);
  if (request) {
    console.log(`✅ Resolving request ${requestId}`);
    success ? request.resolve(data) : request.reject(error);
    queueStore.removeRequest(requestId);
  } else {
    console.warn(
      `⚠️ requestId ${requestId} not found in requestQueue. Possible duplicate message?`
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
