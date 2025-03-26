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

<!-- <script setup>
import * as Icon from '@/assets/images/icon/config.js';
import { ref, onMounted } from 'vue';

const currentTheme = ref('light');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    document.documentElement.setAttribute('data-theme', theme);
    currentTheme.value = theme;
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    currentTheme.value = newTheme;
}

onMounted(() => {
    initTheme();
});
</script>

<template>
    <div class="page">
        <img :src="currentTheme == 'dark' ? Icon.moon : Icon.sun" alt="" class="icon-theme" :title="currentTheme == 'dark' ? '切换至浅色模式' : '切换至深色模式'" @click="toggleTheme" />

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum cupiditate unde sapiente, molestiae ratione doloremque vel aut totam perferendis quasi voluptate iusto error
            impedit ut non quia vitae? Necessitatibus?
        </p>
    </div>
</template>

<style lang="scss" scoped>
.page {
    height: 100%;
    width: 100%;
    padding: 30px;
    background: var(--my-background-color);
    color: var(--van-text-color);

    .icon-theme {
        width: 20px;
        height: 20px;
        margin-bottom: 30px;
        cursor: pointer;
    }
}
</style> -->
