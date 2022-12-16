<template>
  <div>
    <h1>Service Worker</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default class ServiceWorker extends Vue {
  mounted() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        console.log('navigator');
        navigator.serviceWorker.register('@/lib/sw.js').then(
          () => {
            console.log('Service Worker registration successful!');
          },
          (err) => {
            console.log('Service Worker registration failed', err);
          }
        );
      });
    } else {
      console.log('Service Worker Unsupported');
    }
  }
}
</script>

<style scoped></style>
