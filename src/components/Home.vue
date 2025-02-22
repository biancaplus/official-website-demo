<script setup>
import * as HomeImg from "@/assets/images/home/config.js";
import TitleHeader from "@/components/components/TitleHeader.vue";
import { onMounted, ref, getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance();
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
// import ServiceList from "./service/service-data.js";
import miment from "miment";
import { useI18n } from "vue-i18n";
import { getNewsList } from "@/components/news/news-data.js";
const { t, locale } = useI18n();

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
const carouselConfig = ref({
  itemsToShow: 4,
  wrapAround: true,
  snapAlign: "start",
});
function resetCarouselConfig() {
  let offsetWid = document.documentElement.clientWidth;
  if (offsetWid < 560) {
    carouselConfig.value.itemsToShow = 1;
    carouselConfig2.value.itemsToShow = 1;
    carouselConfig3.value.itemsToShow = 2;
  } else if (offsetWid < 760) {
    carouselConfig.value.itemsToShow = 2;
    carouselConfig2.value.itemsToShow = 2;
    carouselConfig3.value.itemsToShow = 3;
  } else if (offsetWid < 990) {
    carouselConfig.value.itemsToShow = 3;
    carouselConfig2.value.itemsToShow = 3;
    carouselConfig3.value.itemsToShow = 4;
  } else {
    carouselConfig.value.itemsToShow = 4;
    carouselConfig2.value.itemsToShow = 4;
    carouselConfig3.value.itemsToShow = 5;
  }
}

// service
const serviceList = ref([]);
function initializeServiceList() {
  serviceList.value = [
    {
      id: 1,
      title: t("service1"),
      imgUrl: "service1",
      content:
        "集中供墨系统是基于“洁净、高效、智能”理念而研发。自动搅拌装置即使在寒冷的冬天也能保证油墨良好的流动性，节省大量生产准备时间。采用超声波传感器，实时探测扫描墨池内的分布状态，全自动补墨，可避免大用量墨区消耗油墨太快、供墨不足的问题，免去了过去频繁添加油墨的繁琐工作。",
    },
    {
      id: 2,
      title: t("service2"),
      imgUrl: "service2",
      content:
        "针对性地解决铁罐包装固废污染高和使用损耗高的问题。袋装油墨使用完毕后，易处理，包装内残留墨量远远低于铁罐包装残余量。",
    },
    {
      id: 3,
      title: t("service3"),
      imgUrl: "service3",
      content:
        "手持式挤墨器可随意使用到多个墨池，灵活机动，性价比高，操作简便，感应高效。采用锂电池供电，充电一次可挤2KG袋装油墨200袋。6KG供墨装置是免安装支架设计，安装简单，墨斗边注墨，无油墨拉丝干净整洁。一次可装入3包2KG油墨，6KG可以基本满足一个班次的生产需求。容器内自动充氮气可以防止油墨结皮。",
    },
  ];
}
function toServiceDetail(id) {
  proxy.$router.push({
    name: "service-detail",
    query: {
      id,
    },
  });
}

// aboutus
const aboutusList = ref([
  {
    id: 1,
    name: "生产基地",
    imgPath: HomeImg.aboutus1,
  },
  {
    id: 2,
    name: "码垛机",
    imgPath: HomeImg.aboutus2,
  },
  {
    id: 3,
    name: "布勒生产线",
    imgPath: HomeImg.aboutus3,
  },
  {
    id: 4,
    name: "研发团队",
    imgPath: HomeImg.aboutus4,
  },
  {
    id: 5,
    name: "UV LED 固化仪",
    imgPath: HomeImg.aboutus5,
  },
]);
const carouselConfig2 = ref({
  autoplay: 2000,
  itemsToShow: 4,
  wrapAround: true,
  snapAlign: "start",
});

// news
const newsList = ref(getNewsList(t).slice(0, 3));
function toNewsDetail(id) {
  proxy.$router.push({
    name: "news-detail",
    query: {
      id,
    },
  });
}
// history
const historyList = ref([
  {
    id: 1,
    imgPath: HomeImg.history1,
  },
  {
    id: 2,
    imgPath: HomeImg.history2,
  },
  {
    id: 3,
    imgPath: HomeImg.history3,
  },
  {
    id: 4,
    imgPath: HomeImg.history4,
  },
  {
    id: 5,
    imgPath: HomeImg.history5,
  },
  {
    id: 6,
    imgPath: HomeImg.history6,
  },
  {
    id: 7,
    imgPath: HomeImg.history7,
  },
  {
    id: 8,
    imgPath: HomeImg.history8,
  },
]);
const carouselConfig3 = ref({
  autoplay: 1500,
  itemsToShow: 5,
  gap: 20,
  wrapAround: true,
  snapAlign: "start",
});
function getYear(date) {
  return miment(date).format("YYYY");
}
function getMonth(date) {
  return miment(date).format("MM-DD");
}

function handleResize() {
  // 重置banner
  if (RefBannerSwipe.value) {
    RefBannerSwipe.value.resize();
  }

  // 重置幻灯片个数
  resetCarouselConfig();
}

// 监听语言切换，更新文本
watch(locale, () => {
  initializeServiceList();
  newsList.value = getNewsList(t).slice(0, 3);
});

onMounted(() => {
  resetCarouselConfig();
  window.addEventListener("resize", handleResize);

  initializeServiceList();
});
</script>

<template>
  <div class="page">
    <div class="banner-wrap mb30">
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
    <div class="products-wrap mb30">
      <title-header :title="t('main product')"></title-header>
      <div class="carousel-wrap">
        <Carousel v-bind="carouselConfig" class="my-carousel">
          <Slide v-for="slide in productList" :key="slide">
            <div class="carousel__item bg-item">
              <img :src="slide.imgPath" alt="" class="img" />
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
      <img src="@/assets/images/home/home-middle-banner-zh.jpg" alt="" />
    </div>
    <div class="service-wrap mb30">
      <div class="service-box" v-for="service in serviceList" :key="service.id">
        <title-header :title="service.title"></title-header>
        <img :src="HomeImg[service.imgUrl]" alt="" />
        <p>{{ service.content }}</p>
        <span class="p-link" @click="toServiceDetail(service.id)"
          >{{ t("read more") }} >></span
        >
      </div>
    </div>
    <div class="aboutus-wrap mb30">
      <title-header :title="t('about us')"></title-header>
      <div class="carousel-wrap">
        <Carousel v-bind="carouselConfig2" class="my-carousel">
          <Slide v-for="slide in aboutusList" :key="slide">
            <div class="carousel__item bg-item2">
              <img :src="slide.imgPath" alt="" />
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
    <div class="news-wrap mb30">
      <title-header :title="t('news')" :type="2"></title-header>
      <div class="news-box-wrap">
        <div class="news-box" v-for="news in newsList" :key="news.id">
          <img :src="HomeImg[news.imgUrl]" alt="" class="mb20" />
          <div class="c-box-wrap">
            <div class="c-time mr20">
              <div class="p-year">{{ getYear(news.date) }}</div>
              <div>{{ getMonth(news.date) }}</div>
            </div>
            <div class="c-box">
              <p class="p-title">{{ news.title }}</p>
              <p>{{ news.subtitle }}</p>
              <span class="p-link" @click="toNewsDetail(news.id)"
                >{{ t("read more") }} >></span
              >
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
            <div class="carousel__item">
              <img :src="slide.imgPath" alt="" />
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="footer-wrap">
      <div class="p-text mr20">
        {{ t("copyright") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  z-index: 10;
  width: 100%;
  height: 100%;
  .banner-wrap {
    width: 100%;
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
        font-family: "Open Sans", Hind;
        font-size: 14px;
        font-weight: 300;
        line-height: 26px;
        color: #848484;
      }
      .p-link {
        font-size: 13px;
        color: #004098;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .aboutus-wrap {
    padding: 40px 30px;
    background-color: #f7f7f7;
  }
  .news-wrap {
    padding: 0 30px;
    font-family: "Open Sans", Hind;
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
          height: 190px;
          overflow: hidden;
        }
        p {
          margin: 10px 0;
          font-size: 14px;
          color: #848484;
        }
        .p-title {
          font-size: 16px;
          color: #000;
          margin-top: 0;
        }
        .p-link {
          font-size: 13px;
          color: #004098;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .c-box-wrap {
          display: flex;
          .c-time {
            padding: 10px 10px 10px 10px;
            background-color: #004098;
            font-size: 16px;
            align-self: flex-start;
            color: #fff;
            .p-year {
              font-size: 16px;
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
    border-top: 1px solid rgb(243, 243, 243);
    .p-text {
      font-family: "Open Sans", Hind;
      font-size: 15px;
      line-height: 26px;
      color: #3a3a3a;
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
<style>
.my-carousel {
  .carousel__viewport {
    padding-top: 20px;
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
          border-color: #dedede;
          background-color: #fff;
          img {
            width: 80%;
          }
        }
        &.bg-item:hover {
          box-shadow: 0 0 25px -2px rgba(0, 0, 0, 0.14);
          top: -2px;
        }

        &.bg-item2 {
          position: relative;
          border: 1px solid #dedede;
          border-radius: 1px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
          -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);

          .img-cover {
            width: 100%;
            height: 100%;
            padding-top: 30px;
            background: rgba(255, 255, 255, 0.9);
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            transition: top 0.5s ease;

            p {
              text-align: center;
              color: #848484;
              font-family: "Open Sans", Hind;
              font-size: 16px;
              font-weight: 300;
              line-height: 26px;
            }
          }
        }
        &.bg-item2:hover {
          .img-cover {
            top: 0;
          }
        }

        .p-text {
          vertical-align: baseline;
          color: #888;
          font-family: "Open Sans", Hind;
          font-size: 15px;
          font-weight: 300;
          margin-bottom: 10px;
          text-align: center;
          padding: 0 8px;
        }
        .p-type {
          color: #004098;
          margin-bottom: 10px;
        }
      }
    }
  }

  .carousel__prev,
  .carousel__next {
    color: rgb(64, 84, 178);
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
      padding-top: 0;
      .carousel__slide {
        padding: 0;
      }
    }
  }
}
</style>
