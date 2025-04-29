<script setup>
const props = defineProps({
    title: String
});
</script>

<template>
    <div class="show-header-title">{{ props.title }}</div>
</template>

<style lang="scss" scoped>
.show-header-title {
    text-align: center;
    padding: 18px 0;
    background-color: var(--my-background-color-2);
    color: var(--van-text-color-3);
    font-size: 17px;
    font-weight: bold;
    display: none;
}
@media screen and (max-width: 960px) {
    .show-header-title {
        display: block;
    }
}
</style>
