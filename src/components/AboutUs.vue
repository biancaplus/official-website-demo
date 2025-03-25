<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
    <div class="page">
        <div class="header-title">{{ t('about us') }}</div>
        <div class="page-main">
            <div class="title-1">
                <span class="blue">SINCE</span>
                <span class="red">2004</span>
            </div>
            <div class="title-2">{{ t('company name') }}</div>
            <div class="content">
                <p class="p-text">
                    {{ t('company-introduce1') }}
                </p>
                <p class="p-text">
                    {{ t('company-introduce2') }}
                </p>
            </div>
            <img src="@/assets/images/about-us/bg.png" alt="" class="img" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page {
    width: 100%;
    .page-main {
        width: 100%;
        padding: 5% 12%;
        position: relative;
        background: var(--van-background-color);
    }
}
.header-title {
    text-align: center;
    padding: 18px 0;
    background-color: var(--my-background-color-2);
    color: var(--van-text-color-3);
    font-size: 17px;
    font-weight: bold;
    display: none;
}
.title-1 {
    font-size: 22px;
    font-weight: bold;
    .blue {
        color: var(--my-blue);
        margin-right: 10px;
    }
    .red {
        color: var(--my-red);
    }
}
.title-2 {
    font-size: 24px;
    font-weight: bold;
    color: var(--my-text-color-3);
    margin-bottom: 10px;
}
.content {
    .p-text {
        color: #000;
        font-size: 18px;
        color: var(--my-text-color-7);
        text-indent: 2em;
        line-height: 2.5;
        text-align: justify;
    }
}
.img {
    width: 100%;
    margin: 30px 0;
}

@media screen and (max-width: 1040px) {
    .page .page-main {
        padding: 4% 8%;
    }
}

@media screen and (max-width: 960px) {
    .page {
        .header-title {
            display: block;
        }
    }
}

@media screen and (max-width: 800px) {
    .page .page-main {
        padding: 3% 6%;
    }
}
</style>
