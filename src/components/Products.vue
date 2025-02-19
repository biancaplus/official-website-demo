<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div>产品</div>
  <router-view></router-view>
</template>

<style lang='scss' scoped>
</style>
