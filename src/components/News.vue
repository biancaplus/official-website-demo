<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import { useRoute } from 'vue-router';
const route = useRoute();
import { getWebPImage, getOriginalImage } from '@/utils/imageUtils';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const routeList = computed(() => {
    let Item = route.matched && route.matched.length ? route.matched[1] : null;
    let list = Item != null ? [Item] : [];

    if (Item && Item.name.includes('detail')) {
        let type = Item.name.split('-')[0];
        list.unshift({ name: type + '-list' });
    }
    return list;
});
function getPageName(name) {
    let nameStr = '';
    switch (name) {
        case 'news-list':
            nameStr = t('news list');
            break;
        case 'news-detail':
            nameStr = t('news detail');
            break;
        case 'product-list':
            nameStr = t('product List');
            break;
        case 'product-detail':
            nameStr = t('product detail');
            break;
    }
    return nameStr;
}
function toPage(name) {
    proxy.$router.push({
        name
    });
}
</script>

<template>
    <div class="news-page">
        <div class="page-header">
            <picture>
                <source :srcset="getWebPImage('header-bg.png', 'news')" type="image/webp" />
                <img :src="getOriginalImage('header-bg.png', 'news')" alt="" class="img" />
            </picture>
            <div class="breadcrumb-wrap">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item home-item" @click="toPage('home')">
                        {{ t('home') }}
                    </li>
                    <li class="breadcrumb-item" v-for="(item, index) in routeList" :key="index" @click="toPage(item.name)">
                        {{ getPageName(item.name) }}
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
.news-page {
    width: 100%;
    height: 100%;
    .page-header {
        width: 100%;
        background: var(--van-background-color);
        .img {
            width: 100%;
            height: 280px;
        }
    }
    .breadcrumb-wrap {
        padding: 20px;
        .breadcrumb {
            display: flex;
            font-size: 18px;
            color: var(--van-text-color-2); //#6c757d;
            margin-bottom: 0;
            height: 24px;
            line-height: 24px;
            .breadcrumb-item {
                padding: 0 5px 0 20px;
                position: relative;
                cursor: pointer;
                &::before {
                    content: '';
                    width: 13px;
                    height: 13px;
                    position: absolute;
                    left: 3px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: url('@/assets/images/icon/next.png') no-repeat;
                    background-size: 100% 100%;
                }
                &.home-item::before {
                    background: url('@/assets/images/icon/home.png') no-repeat;
                    background-size: 100% 100%;
                }
                &:nth-last-of-type(1),
                &:hover {
                    color: var(--my-text-color-2) !important;
                }
            }
        }
    }
}

@media screen and (max-width: 1040px) {
    .news-page .page-header {
        .img {
            height: 220px;
        }
    }
}
@media screen and (max-width: 800px) {
    .news-page .page-header {
        .img {
            height: 180px;
        }
    }
}
@media screen and (max-width: 500px) {
    .news-page {
        .page-header {
            .img {
                height: 150px;
            }
        }
        .breadcrumb-wrap .breadcrumb {
            font-size: 16px;
        }
    }
}
@media screen and (max-width: 380px) {
    .news-page {
        .breadcrumb-wrap .breadcrumb {
            font-size: 15px;
        }
    }
}
@media screen and (max-width: 350px) {
    .news-page {
        .breadcrumb-wrap .breadcrumb {
            font-size: 14px;
        }
    }
}
</style>
