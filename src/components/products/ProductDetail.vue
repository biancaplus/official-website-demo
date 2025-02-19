<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div>{{ route.query.id }}</div>
</template>

<style lang='scss' scoped>
</style>
