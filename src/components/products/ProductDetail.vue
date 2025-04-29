<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <div class="page">{{ route.query.id }}</div>
</template>

<style lang="scss" scoped>
.page {
    height: 100%;
    width: 100%;
    background: var(--my-background-color-2);
    color: var(--van-text-color);
}
</style>