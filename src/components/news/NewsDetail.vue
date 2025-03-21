<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
import { getNewsList } from './news-data.js';
import NewsImages from '@/assets/images/news/config-name.js';
import { getWebPImage, getOriginalImage } from '@/utils/imageUtils';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const detail = computed(() => {
    let obj = {};
    let list = getNewsList(t);
    list.forEach(item => {
        if (item.id == route.query.id) {
            obj = item;
        }
    });

    return obj;
});
</script>

<template>
    <div class="page">
        <div class="detail-box">
            <div class="title-box">
                <p class="title1">{{ detail.title }}</p>
                <p class="title2">
                    {{ detail.subtitle }}
                </p>
                <p class="editor">{{ t('editor') }}：岁月静好</p>
            </div>
            <div class="content-wrap">
                <picture>
                    <source :srcset="getWebPImage(NewsImages[detail.imgUrl], 'news')" type="image/webp" />
                    <img :src="getOriginalImage(NewsImages[detail.imgUrl], 'news')" alt="" class="img" />
                </picture>
                <p class="content">
                    {{ detail.content }}
                </p>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page {
    padding: 25px;
    background: rgb(245, 245, 245);
    .detail-box {
        background: #fff;
        padding: 20px;
        .title-box {
            .title1 {
                font-size: 24px;
                color: rgba(34, 34, 34, 1);
                line-height: 1;
                font-weight: bold;
                font-family: Arial;
                margin-bottom: 10px;
            }
            .title2 {
                color: rgba(0, 0, 0, 0.5);
                font-size: 16px;
                font-weight: normal;
                line-height: 1.5;
                padding-bottom: 20px;
                border-bottom: 1px solid #e7e7e7;
            }
            .editor {
                padding: 15px 0;
                text-align: right;
            }
        }
        .content-wrap {
            width: 100%;
            .img {
                display: inline-block;
                width: 250px;
                float: left;
                margin: 0 20px 10px 0;
            }
            .content {
                color: #666;
                line-height: 1.8;
                font-size: 18px;
                text-indent: 2em;
                letter-spacing: 2px;
                text-align: justify;
            }
            .clear {
                clear: both; /* 清除浮动 */
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .page .detail-box .content-wrap {
        .img {
            width: 100%;
        }
    }
}
</style>
