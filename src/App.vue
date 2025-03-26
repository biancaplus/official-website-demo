<script setup>
import AppHeader from '@/components/components/AppHeader.vue';
import { onMounted } from 'vue';

// 修正移动端vh
function setVhCssVar() {
    const vh = window.innerHeight * 0.01;
    // 创建全局变量 --vh
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

onMounted(() => {
    setVhCssVar();
    window.addEventListener('resize', setVhCssVar);
});
</script>

<template>
    <div class="header-wrap">
        <app-header></app-header>
    </div>
    <div class="page-wrap">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
$header-height: 80px;
.header-wrap {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    background: var(--van-background-color);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.page-wrap {
    position: absolute;
    top: $header-height;
    left: 0;
    right: 0;
    height: calc(var(--vh, 1vh) * 100 - $header-height);
    overflow-y: auto;
    background: var(--van-background-color);
}
</style>
