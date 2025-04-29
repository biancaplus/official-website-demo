<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '暂无数据'
    }
});
</script>

<template>
    <div class="no-data-container">
        <img src="@/assets/images/icon/no-data.png" alt="" class="no-data" />
        <p>{{ props.text }}</p>
    </div>
</template>

<style lang="scss" scoped>
.no-data-container {
    text-align: center;
    .no-data {
        padding-top: 5rem;
    }
    p {
        text-align: center;
        font-size: 0.9rem;
        color: #a0b3c6;
    }
}
</style>
