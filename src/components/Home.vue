<script setup>
import HomeImages from '@/assets/images/home/config-name.js';
import NewsImages from '@/assets/images/news/config-name.js';
import { getWebPImage, getOriginalImage } from '@/utils/imageUtils';
import TitleHeader from '@/components/components/TitleHeader.vue';
import { onMounted, ref, getCurrentInstance, watch } from 'vue';
const { proxy } = getCurrentInstance();
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import miment from 'miment';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

import { getNewsList } from '@/components/news/news-data.js';
import { getServiceList } from '@/components/service/service-data.js';
import { getAboutusList } from '@/components/aboutus/aboutus-data.js';
import { getProductList } from '@/components/products/product-data.js';

// banner
const RefBannerSwipe = ref();
const images = ['banner1_t', 'banner2_t', 'banner3_t'];
const activeIndex = ref(0);
function swipeTo(index) {
    RefBannerSwipe.value.swipeTo(index);
}
function getActiveIndex(index) {
    activeIndex.value = index;
}

// product
const productList = ref(getProductList(t));
const KeyProductCarousel = ref('product' + Date.now());
const carouselConfig = ref({
    wrapAround: true,
    snapAlign: 'start',
    breakpointMode: 'carousel',
    breakpoints: {
        560: {
            itemsToShow: 1
        },
        760: {
            itemsToShow: 2
        },
        990: {
            itemsToShow: 3
        },
        1200: {
            itemsToShow: 4
        }
    }
});

// service
const serviceList = ref(getServiceList(t));

// aboutus
const aboutusList = ref(getAboutusList(t));
const KeyAboutusCarousel = ref('aboutus' + Date.now());
const carouselConfig2 = ref({
    autoplay: 2000,
    wrapAround: true,
    snapAlign: 'start',
    breakpointMode: 'carousel',
    breakpoints: {
        560: {
            itemsToShow: 1
        },
        760: {
            itemsToShow: 2
        },
        990: {
            itemsToShow: 3
        },
        1200: {
            itemsToShow: 4
        }
    }
});

// news
const newsList = ref(getNewsList(t).slice(0, 3));

// history
const historyList = ref([
    {
        id: 1,
        imgPath: 'history1'
    },
    {
        id: 2,
        imgPath: 'history2'
    },
    {
        id: 3,
        imgPath: 'history3'
    },
    {
        id: 4,
        imgPath: 'history4'
    },
    {
        id: 5,
        imgPath: 'history5'
    },
    {
        id: 6,
        imgPath: 'history6'
    },
    {
        id: 7,
        imgPath: 'history7'
    },
    {
        id: 8,
        imgPath: 'history8'
    }
]);
const carouselConfig3 = ref({
    autoplay: 1500,
    gap: 20,
    wrapAround: true,
    snapAlign: 'start',
    breakpointMode: 'carousel',
    breakpoints: {
        560: {
            itemsToShow: 2
        },
        760: {
            itemsToShow: 3
        },
        990: {
            itemsToShow: 4
        },
        1200: {
            itemsToShow: 5
        }
    }
});
function getYear(date) {
    return miment(date).format('YYYY');
}
function getMonth(date) {
    return miment(date).format('MM-DD');
}

function toDetail(type, id) {
    proxy.$router.push({
        name: type + '-detail',
        query: {
            id
        }
    });
}
function handleResize() {
    // 重置banner
    if (RefBannerSwipe.value) {
        RefBannerSwipe.value.resize();
    }
}

// 监听语言切换，更新文本
watch(locale, () => {
    productList.value = getProductList(t);
    serviceList.value = getServiceList(t);
    aboutusList.value = getAboutusList(t);
    newsList.value = getNewsList(t).slice(0, 3);
    KeyAboutusCarousel.value = 'aboutus' + Date.now();
    KeyProductCarousel.value = 'product' + Date.now();
});

onMounted(() => {
    window.addEventListener('resize', handleResize);
});
</script>

<template>
    <div class="page">
        <div class="banner-wrap mb30">
            <van-swipe class="banner-swipe" :autoplay="3000" lazy-render :show-indicators="false" ref="RefBannerSwipe" @change="getActiveIndex">
                <van-swipe-item v-for="image in images" :key="image">
                    <picture>
                        <source :srcset="getWebPImage(HomeImages[image], 'home')" type="image/webp" />
                        <img :src="getOriginalImage(HomeImages[image], 'home')" class="banner-img" />
                    </picture>
                </van-swipe-item>
            </van-swipe>
            <div class="indicator-wrap">
                <div class="indicator" :class="index == activeIndex ? 'active' : ''" v-for="(indicator, index) in images" :key="index" @click="swipeTo(index)"></div>
            </div>
        </div>
        <div class="products-wrap mb30">
            <title-header :title="t('main product')"></title-header>
            <div class="carousel-wrap">
                <Carousel v-bind="carouselConfig" class="my-carousel" :key="KeyProductCarousel">
                    <Slide v-for="slide in productList" :key="slide">
                        <div class="carousel__item bg-item">
                            <picture>
                                <source :srcset="getWebPImage(HomeImages[slide.imgPath], 'home')" type="image/webp" />
                                <img :src="getOriginalImage(HomeImages[slide.imgPath], 'home')" alt="" class="img" />
                            </picture>
                            <p class="p-text">{{ slide.name }}</p>
                            <p class="p-text p-type">{{ slide.type }}</p>
                        </div>
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>
        <div class="middle-banner-wrap mb30">
            <img src="@/assets/images/home/home-middle-banner-zh.png" alt="" />
        </div>
        <div class="service-wrap mb30">
            <div class="service-box" v-for="service in serviceList" :key="service.id">
                <title-header :title="service.title"></title-header>
                <picture>
                    <source :srcset="getWebPImage(HomeImages[service.imgUrl], 'home')" type="image/webp" />
                    <img :src="getOriginalImage(HomeImages[service.imgUrl], 'home')" alt="" />
                </picture>
                <p>{{ service.content }}</p>
                <span class="p-link" @click="toDetail('service', service.id)">{{ t('read more') }} >></span>
            </div>
        </div>
        <div class="aboutus-wrap mb30">
            <title-header :title="t('about us')"></title-header>
            <div class="carousel-wrap">
                <Carousel v-bind="carouselConfig2" class="my-carousel" :key="KeyAboutusCarousel">
                    <Slide v-for="slide in aboutusList" :key="slide">
                        <div class="carousel__item bg-item2">
                            <picture>
                                <source :srcset="getWebPImage(HomeImages[slide.imgPath], 'home')" type="image/webp" />
                                <img :src="getOriginalImage(HomeImages[slide.imgPath], 'home')" alt="" />
                            </picture>
                            <div class="img-cover">
                                <p>{{ slide.name }}</p>
                            </div>
                        </div>
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>
        <div class="news-wrap mb40">
            <title-header :title="t('news')" :type="2"></title-header>
            <div class="news-box-wrap">
                <div class="news-box" v-for="news in newsList" :key="news.id">
                    <picture>
                        <source :srcset="getWebPImage(NewsImages[news.imgUrl], 'news')" type="image/webp" />
                        <img :src="getOriginalImage(NewsImages[news.imgUrl], 'news')" alt="" class="mb20" />
                    </picture>
                    <div class="c-box-wrap">
                        <div class="c-time mr20">
                            <div class="p-year">{{ getYear(news.date) }}</div>
                            <div>{{ getMonth(news.date) }}</div>
                        </div>
                        <div class="c-box">
                            <p class="p-title">{{ news.title }}</p>
                            <p>{{ news.subtitle }}</p>
                            <span class="p-link" @click="toDetail('news', news.id)">{{ t('read more') }} >></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="history-wrap mb30">
            <title-header :title="t('history')"></title-header>
            <div class="carousel-wrap">
                <Carousel v-bind="carouselConfig3" class="my-carousel my-carousel1">
                    <Slide v-for="slide in historyList" :key="slide">
                        <div class="carousel__item bg-item3">
                            <picture>
                                <source :srcset="getWebPImage(HomeImages[slide.imgPath], 'home')" type="image/webp" />
                                <img :src="getOriginalImage(HomeImages[slide.imgPath], 'home')" alt="" />
                            </picture>
                        </div>
                    </Slide>
                </Carousel>
            </div>
        </div>
        <div class="footer-wrap">
            <div class="p-text mr20">
                {{ t('copyright') }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page {
    z-index: 10;
    width: 100%;
    background: var(--van-background-color);
    .banner-wrap {
        width: 100%;
        aspect-ratio: 135/42;
        position: relative;
        .banner-img {
            width: 100%;
        }
        .indicator-wrap {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            .indicator {
                margin: 3px;
                width: 8px;
                height: 8px;
                background: rgba(64, 64, 64, 0.5);
                border-radius: 50%;
                cursor: pointer;
                &:hover,
                &.active {
                    background: rgb(64, 64, 64);
                }
            }
        }
    }
    .products-wrap {
        padding: 0 30px;
        margin-bottom: 40px;
        .carousel-wrap {
            padding: 0 15px;
        }
    }
    .middle-banner-wrap {
        width: 100%;
        img {
            width: 100%;
        }
    }
    .service-wrap {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        .service-box {
            width: 32%;
            img {
                width: 100%;
            }
            p {
                margin: 10px 0;
                font-family: 'Open Sans', Hind;
                font-size: 14px;
                font-weight: 300;
                line-height: 26px;
                color: #848484;
            }
            .p-link {
                font-size: 13px;
                color: var(--my-theme);
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
    .aboutus-wrap {
        padding: 40px 30px;
        background-color: var(--my-background-color-2);
    }
    .news-wrap {
        padding: 0 30px;
        font-family: 'Open Sans', Hind;
        font-weight: 300;
        line-height: 26px;
        .news-box-wrap {
            display: flex;
            justify-content: space-between;
            padding-top: 10px;
            .news-box {
                width: 32%;
                img {
                    width: 100%;
                    overflow: hidden;
                }
                p {
                    // margin: 10px 0;
                    font-size: 14px;
                    color: #848484;
                }
                .p-title {
                    font-size: 16px;
                    color: var(--my-text-color-3);
                    margin-top: 0;
                }
                .p-link {
                    font-size: 13px;
                    color: var(--my-theme);
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .c-box-wrap {
                    display: flex;
                    .c-time {
                        padding: 10px 10px 10px 10px;
                        background-color: var(--my-theme);
                        font-size: 16px;
                        align-self: flex-start;
                        color: #fff;
                        opacity: 0.9;
                        .p-year {
                            font-size: 18px;
                            font-weight: 500;
                        }
                    }

                    .c-box {
                        flex: 1;
                    }
                }
            }
        }
    }
    .history-wrap {
        padding: 0 30px;
    }
    .footer-wrap {
        display: flex;
        justify-content: center;
        padding: 30px;
        border-top: 1px solid var(--my-border-color-2);
        .p-text {
            font-family: 'Open Sans', Hind;
            font-size: 15px;
            line-height: 26px;
            color: var(--my-text-color-5);
        }
    }
}
@media screen and (max-width: 950px) {
    .page {
        .news-wrap .news-box-wrap .news-box .c-box-wrap {
            .c-time {
                display: none;
            }
        }
        .footer-wrap {
            flex-wrap: wrap;
            justify-content: center;
            .p-text {
                margin-right: 0;
            }
        }
    }
}

@media screen and (max-width: 770px) {
    .page {
        .service-wrap {
            flex-wrap: wrap;
            .service-box {
                width: 100%;
                margin-bottom: 20px;
            }
        }
        .news-wrap .news-box-wrap {
            flex-wrap: wrap;
            .news-box {
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
}
</style>
<style lang="scss">
.my-carousel {
    .carousel__viewport {
        padding: 20px 0;
        .carousel__slide {
            padding: 0 20px;
            .carousel__item {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                img {
                    width: 100%;
                }

                &.bg-item {
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
                    border-style: solid;
                    border-width: 1px 1px 1px 1px;
                    border-color: var(--my-border-color-3);
                    background-color: var(--my-background-color-4);
                    img {
                        width: 100%;
                        margin-bottom: 10px;
                    }
                }
                &.bg-item:hover {
                    box-shadow: 0 0 25px -2px rgba(0, 0, 0, 0.14);
                    top: -2px;
                }

                &.bg-item2 {
                    position: relative;
                    border: 1px solid var(--my-border-color-3);
                    border-radius: 1px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
                    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);

                    img {
                        height: 100%;
                    }

                    .img-cover {
                        width: 100%;
                        height: 100%;
                        padding-top: 30px;
                        background: var(--my-background-color-5);
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        opacity: 0;
                        transition: opacity 0.2s ease, top 0.5s ease;

                        p {
                            text-align: center;
                            color: var(--my-text-color-6);
                            font-family: 'Open Sans', Hind;
                            font-size: 16px;
                            font-weight: 300;
                            line-height: 26px;
                        }
                    }
                }
                &.bg-item2:hover {
                    .img-cover {
                        top: 0;
                        opacity: 1;
                    }
                }

                &.bg-item3 {
                    img {
                        height: 100%;
                    }
                }

                .p-text {
                    vertical-align: baseline;
                    color: var(--my-text-color-6);
                    font-family: 'Open Sans', Hind;
                    font-size: 15px;
                    font-weight: 300;
                    margin-bottom: 10px;
                    text-align: center;
                    padding: 0 8px;
                }
                .p-type {
                    color: var(--my-theme);
                    margin-bottom: 10px;
                }
            }
        }
    }

    .carousel__prev,
    .carousel__next {
        color: var(--my-theme);
        width: 25px;
        height: 30px;
    }
    .carousel__prev {
        left: -30px;
    }
    .carousel__next {
        right: -30px;
    }

    &.my-carousel1 {
        .carousel__viewport {
            padding: 0;
            .carousel__slide {
                padding: 0;
            }
        }
    }
}
</style>
