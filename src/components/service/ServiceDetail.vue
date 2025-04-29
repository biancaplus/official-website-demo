<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
import NoData from '@/components/components/NoData.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

defineProps({
    msg: String
});

const count = ref(0);
</script>

<template>
    <div class="page">
        <!-- {{ route.query.id }} -->
        <ShowHeaderTitle :title="t('service detail')" />
        <NoData text="暂无设计" />
    </div>
</template>

<style lang="scss" scoped>
.page {
    height: 100%;
    width: 100%;
    background: var(--my-background-color-2);
    color: var(--van-text-color);
}
</style>
