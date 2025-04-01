import { defineStore } from 'pinia';

export const useQueueStore = defineStore('queue', {
  state: () => ({
    requestQueue: new Map()
  }),
  actions: {
    addRequest(request) {
      this.requestQueue.set(request.requestId, request);
    },
    removeRequest(requestId) {
      return this.requestQueue.delete(requestId);
    },
    getRequest(requestId) {
      return this.requestQueue.get(requestId);
    },
    clearQueue() {
      this.requestQueue.clear();
    }
  }
});