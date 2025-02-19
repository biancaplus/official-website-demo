<script setup>
import * as HomeImg from "@/assets/images/home/config.js";
import TitleHeader from "@/components/components/TitleHeader.vue";
import { onMounted, ref } from "vue";
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 4,
  wrapAround: true,
  gap:40,
  snapAlign:'start'
}

// banner
const RefBannerSwipe = ref();
const images = [HomeImg.banner1, HomeImg.banner2, HomeImg.banner3];
const activeIndex = ref(0);
function swipeTo(index) {
  RefBannerSwipe.value.swipeTo(index);
}
function getActiveIndex(index) {
  activeIndex.value = index;
}

// product
const productList = ref([
  {
    id: 1,
    name: "05型 快干亮光胶版油墨",
    type: "单张纸胶印油墨",
    url: "#",
    imgPath: HomeImg.product1,
  },
  {
    id: 2,
    name: "PRS-XX66/N 高光不结皮胶版油墨",
    type: "单张纸胶印油墨",
    url: "#",
    imgPath: HomeImg.product2,
  },
  {
    id: 3,
    name: "PSE环保型大豆油基胶版油墨",
    type: "单张纸胶印油墨",
    url: "#",
    imgPath: HomeImg.product3,
  },
  {
    id: 4,
    name: "PWO型书刊轮转胶版油墨",
    type: "轮转油墨",
    url: "#",
    imgPath: HomeImg.product4,
  },
  {
    id: 5,
    name: "PUV LED 紫外光固化油墨",
    type: "UV油墨",
    url: "#",
    imgPath: HomeImg.product5,
  },
  {
    id: 6,
    name: "PPO型全植物油基胶印油墨",
    type: "单张纸胶印油墨",
    url: "#",
    imgPath: HomeImg.product6,
  },
]);

function handleResize() {
  // 重置banner
  if (RefBannerSwipe.value) {
    RefBannerSwipe.value.resize();
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
</script>

<template>
  <div class="page">
    <div class="banner-wrap">
      <van-swipe
        class="banner-swipe"
        :autoplay="3000"
        lazy-render
        :show-indicators="false"
        ref="RefBannerSwipe"
        @change="getActiveIndex"
      >
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" class="banner-img" />
        </van-swipe-item>
      </van-swipe>
      <div class="indicator-wrap">
        <div
          class="indicator"
          :class="index == activeIndex ? 'active' : ''"
          v-for="(indicator, index) in images"
          :key="index"
          @click="swipeTo(index)"
        ></div>
      </div>
    </div>
    <div class="products-wrap">
      <title-header :title="'主要产品'"></title-header>
      <Carousel v-bind="carouselConfig">
        <Slide v-for="slide in productList" :key="slide">
          <div class="carousel__item">
            <img :src="slide.imgPath" alt=""  >
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.page {
  z-index: 10;
  width: 100%;
  height: 100%;
  .banner-wrap {
    width: 100%;
    margin-bottom: 30px;
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
      // justify-content: center;
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
    height: 300px;
  }
}
</style>
