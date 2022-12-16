<template>
  <div>
    <h1>Web Worker</h1>
    <div class="message">
      <div v-for="msg in message" :key="msg.key" class="parent">
        <p :class="msg.type">
          {{ msg.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import task from '@/lib/worker';
interface Message {
  key: number;
  type: string;
  text: string;
}
export default class WebWorker extends Vue {
  message: Message[] = [];
  worker: any = null;
  mounted() {
    console.log('mounted');
    
    const blob = new Blob([task]);
    this.worker = new Worker(window.URL.createObjectURL(blob));
    this.worker.onmessage = (e: any) => {
      (this.message as Message[]).push({
        type: 'worker',
        text: e.data,
        key: this.message.length,
      });
      setTimeout(() => {
        const msg = 'main says hello';
        this.worker.postMessage(msg);
        (this.message as Message[]).push({
          type: 'main',
          text: msg,
          key: this.message.length,
        });
      }, 3000);
    };
    this.worker.postMessage('start');
  }
  beforeDestroy() {
    this.worker = null;
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 500px;
  max-height: 800px;
  overflow: auto;
  background-color: #fff;
  border: 1px solid black;
}
.parent {
  clear: both;
  overflow: hidden;
}
.main {
  float: right;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  left: -10px;
  background-color: #f8c301;
}
.main::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 100%;
  width: 0;
  height: 0;
  border: solid 8px;
  border-color: #fff #fff #fff #f8c301;
}
.worker {
  float: left;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  position: relative;
  right: -10px;
  background-color: black;
}
.worker::after {
  content: '';
  position: absolute;
  top: 8px;
  right: 100%;
  width: 0;
  height: 0;
  border: solid 8px;
  border-color: #fff #000 #fff #fff;
}
</style>
