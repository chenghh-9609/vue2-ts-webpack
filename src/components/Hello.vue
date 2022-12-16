<template>
  <div class="hello">hello vue +{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    message: String,
  },
});
</script>

<style lang="scss" scoped></style>
