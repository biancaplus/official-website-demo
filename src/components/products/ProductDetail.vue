<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div>{{ route.query.id }}</div>
</template>

<style lang="scss" scoped></style>
