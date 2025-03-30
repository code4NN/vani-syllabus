// src/composables/useServer.js
import { ref, onMounted, onUnmounted } from "vue";

export function useServer() {
    const iframeRef = ref(null);
    const isReady = ref(false);

    // Function to send a message to the iframe (Google Apps Script)
    const sendMessageToIframe = (data) => {
        if (!iframeRef.value?.contentWindow) {
            console.warn("Iframe is not ready yet!");
            return;
        }
        iframeRef.value.contentWindow.postMessage(data, "*");
    };

    // Listen for messages from the iframe
    const listenForIframeResponse = (callback) => {
        const handler = (event) => {
            if (event.origin !== "https://your-appscript-url.com") {
                return;
            }
            callback(event.data);
        };

        window.addEventListener("message", handler);

        // Cleanup event listener on component unmount
        onUnmounted(() => {
            window.removeEventListener("message", handler);
        });
    };

    onMounted(() => {
        isReady.value = true;
    });

    return {
        iframeRef,
        isReady,
        sendMessageToIframe,
        listenForIframeResponse,
    };
}
