<template>
  <iframe ref="iframeRef" :src="iframeUrl" class="hidden" @load="onIframeLoad"></iframe>
</template>

<script setup>
import { ref, defineExpose, onMounted } from "vue";

const iframeRef = ref(null);
const iframeUrl = import.meta.env.VITE_IFRAME_URL;
const isReady = ref(false);

const onIframeLoad = () => {
  isReady.value = true;
};

const callServerFunction = (functionName, params = []) => {
  if (!isReady.value) {
    console.error("Server iframe is not ready");
    return;
  }
  iframeRef.value.contentWindow.postMessage({ functionName, params }, "*");
};

defineExpose({ callServerFunction, isReady });
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
