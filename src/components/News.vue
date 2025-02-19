<script setup>
import { ref, computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute } from "vue-router";
const route = useRoute();

const routeList = computed(() => {
  let Item = route.matched && route.matched.length ? route.matched[1] : null;
  let list = Item != null ? [Item] : [];

  if (Item && Item.name.includes("detail")) {
    let type = Item.name.split("-")[0];
    list.unshift({ name: type + "-list" });
  }
  return list;
});
function getPageName(name) {
  let nameStr = "";
  switch (name) {
    case "news-list":
      nameStr = "新闻列表";
      break;
    case "news-detail":
      nameStr = "新闻详情";
      break;
    case "product-list":
      nameStr = "产品列表";
      break;
    case "product-detail":
      nameStr = "产品详情";
      break;
  }
  return nameStr;
}
function toPage(name) {
  proxy.$router.push({
    name,
  });
}
</script>

<template>
  <div class="news-page">
    <div class="page-header">
      <img src="@/assets/images/news/header-bg.jpg" alt="" class="img" />
      <div class="breadcrumb-wrap">
        <ul class="breadcrumb">
          <li class="breadcrumb-item home-item" @click="toPage('home')">
            首页
          </li>
          <li
            class="breadcrumb-item"
            v-for="(item, index) in routeList"
            :key="index"
            @click="toPage(item.name)"
          >
            {{ getPageName(item.name) }}
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang='scss' scoped>
.news-page {
  width: 100%;
  height: 100%;
  // padding-top: 3px;
  .page-header {
    width: 100%;
    // height: ;
    .img {
      width: 100%;
    }
  }
  .breadcrumb-wrap {
    padding: 20px;
    .breadcrumb {
      display: flex;
      font-size: 16px;
      color: #6c757d;
      .breadcrumb-item {
        padding: 0 5px 0 20px;
        position: relative;
        cursor: pointer;
        &::before {
          content: "";
          width: 13px;
          height: 13px;
          position: absolute;
          left: 3px;
          top: 5px;
          background: url("@/assets/images/icon/下一页.png") no-repeat;
          background-size: 100% 100%;
        }
        &.home-item::before {
          background: url("@/assets/images/icon/首页.png") no-repeat;
          background-size: 100% 100%;
        }
        &:nth-last-of-type(1),
        &:hover {
          color: #212529;
        }
      }
    }
  }
}
</style>
