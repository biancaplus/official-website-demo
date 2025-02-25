<script setup>
import * as Icon from "@/assets/images/icon/config.js";
import { ref, computed, getCurrentInstance, onMounted, watch } from "vue";
const { proxy } = getCurrentInstance();
import { useRoute } from "vue-router";
const route = useRoute();

import { loadLocaleMessages } from "@/utils/language/i18n";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

import clipboard3 from "vue-clipboard3";
const { toClipboard } = clipboard3();
const Url = "http://localhost:5173/ViteDemo";

const menu = ref([]);
// 初始化菜单
function initializeMenu() {
  menu.value = [
    {
      name: t("home"),
      url: "home",
    },
    {
      name: t("about us"),
      url: "about-us",
    },
    {
      name: t("service"),
      url: "service",
      child: [
        {
          name: t("service1"),
          url: "service-detail",
          id: "1",
        },
        {
          name: t("service2"),
          url: "service-detail",
          id: "2",
        },
        {
          name: t("service3"),
          url: "service-detail",
          id: "3",
        },
      ],
    },
    {
      name: t("product"),
      url: "products",
      child: [
        {
          name: t("product1"),
          url: "product-detail",
          id: "1",
        },
        {
          name: t("product2"),
          url: "product-detail",
          id: "2",
        },
        {
          name: t("product3"),
          url: "product-detail",
          id: "3",
        },
      ],
    },
    {
      name: t("news center"),
      url: "news",
    },
    {
      name: t("contact us"),
      url: "contact-us",
    },
  ];
}
const language = ref("zh");
// 加载语言包并初始化菜单
async function loadLanguageAndInitializeMenu(lang) {
  await loadLocaleMessages(lang); // 加载语言包
  initializeMenu(); // 初始化菜单
}

const activeMenu = computed(() => {
  return route.matched[0] ? route.matched[0].name : "";
});
const showMenu = ref(false);
const clickMenu = ref("");

function toPage(item, isDialog) {
  if (isDialog && item.child && item.child.length) {
    changeMenu(item.url);
    return;
  }
  if (isDialog) {
    showMenu.value = false;
  }

  if (item.id && item.id !== null) {
    proxy.$router.push({
      name: item.url,
      query: { id: item.id },
    });
  } else {
    proxy.$router.push({
      name: item.url,
    });
  }
}
async function toCopy() {
  try {
    await toClipboard(Url);
    showSuccessToast(t("copy") + t("success"));
  } catch (e) {
    showFailToast(t("copy") + t("failed"));
    console.log(e);
  }
}
function openMenuDialog() {
  showMenu.value = true;
}
function closeDialog() {
  showMenu.value = false;
}
function changeMenu(url) {
  if (clickMenu.value == url) {
    clickMenu.value = "";
  } else {
    clickMenu.value = url;
  }
  // console.log(clickMenu.value);
}
async function changeLanguage() {
  try {
    await loadLocaleMessages(language.value); // 加载语言文件
    locale.value = language.value; // 更新 locale
  } catch (error) {
    console.error("Failed to load language", error);
  }
}

// 监听语言切换，更新菜单文本
watch(locale, () => {
  initializeMenu();
});

onMounted(async () => {
  await loadLanguageAndInitializeMenu(locale.value);
});
</script>

<template>
  <div class="app-header">
    <div class="left">
      <div class="logo">Logo</div>
      <div class="name">
        <div>Company</div>
        <div>公司名称</div>
      </div>
    </div>
    <div class="center">
      <div
        class="menu cursor"
        :class="{ active: v.url === activeMenu, pl: v.child && v.child.length }"
        v-for="(v, k) in menu"
        :key="k"
        @click="toPage(v, false)"
      >
        <div class="menu-name">{{ v.name }}</div>

        <div
          class="triangle"
          :class="v.url === activeMenu ? 'active' : ''"
          v-if="v.child && v.child.length"
        ></div>
        <div class="sub-menu-wrap" v-if="v.child && v.child.length">
          <div
            class="sub-menu cursor"
            :class="
              item.url === route.name && item.id && item.id === route.query.id
                ? 'active'
                : ''
            "
            v-for="(item, index) in v.child"
            :key="index"
            @click.stop="toPage(item, false)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="menu-box cursor" @click="openMenuDialog">
        <img :src="Icon.menu" alt="" class="menu-img" />
      </div>
    </div>
    <div class="right">
      <div class="share mb10">
        <img
          :src="Icon.link"
          alt=""
          class="icon-img icon-link"
          :title="t('copy') + t('link')"
          @click="toCopy"
        />
        <!-- <img
          :src="locale === 'en' ? Icon.en : Icon.zh"
          alt=""
          style="margin-right: 0"
          class="icon-img icon-language"
          :title="locale === 'en' ? '切换中文' : 'Switch to English'"
          @click="changeLanguage(locale === 'en' ? 'zh' : 'en')"
        /> -->
        <select
          class="language-selector"
          v-model="language"
          @change="changeLanguage"
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </div>
  </div>
  <van-dialog
    v-model:show="showMenu"
    title=""
    :show-confirm-button="false"
    class="menu-dialog"
  >
    <div class="dialog-content">
      <div class="header">
        <img :src="Icon.close" alt="" class="close-img" @click="closeDialog" />
      </div>
      <div class="menu-wrap">
        <div
          class="menu cursor"
          :class="{
            active: v.url === activeMenu,
            pl: v.child && v.child.length,
          }"
          v-for="(v, k) in menu"
          :key="k"
          @click="toPage(v, true)"
        >
          <div class="menu-name">{{ v.name }}</div>
          <div class="triangle-box" v-if="v.child && v.child.length">
            <img
              :src="Icon.more2"
              alt=""
              class="triangle"
              :class="v.url === clickMenu ? 'active' : ''"
            />
          </div>
          <div
            class="sub-menu-wrap"
            v-if="v.child && v.child.length"
            :class="v.url === clickMenu ? 'active' : ''"
          >
            <div
              class="sub-menu cursor"
              :class="
                item.url === route.name && item.id && item.id === route.query.id
                  ? 'active'
                  : ''
              "
              v-for="(item, index) in v.child"
              :key="index"
              @click.stop="toPage(item, true)"
            >
              {{ item.name }}
              <div class="triangle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<style lang="scss" scoped>
$header-height: 80px;
.app-header {
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: 200px;
  padding-right: 150px; // 100px
  z-index: 600;
  .left {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    padding: 0 10px 0 20px;
    display: flex;
    align-items: center;
    .logo {
      width: 65px;
      height: 55px;
      background: #004098;
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      margin-right: 10px;
    }
    .name {
      color: rgb(41, 39, 40);
      font-size: 20px;
      font-weight: bold;
    }
  }
  .center {
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 10px;
    .menu {
      position: relative;
      padding: 0 25px;
      height: $header-height;
      font-weight: bold;
      .menu-name {
        white-space: nowrap;
        color: #333;
        line-height: $header-height;
      }
      .triangle {
        position: absolute;
        right: 15px;
        top: 45%;
        width: 6px;
        height: 6px;
        border-right: 1px solid #707070;
        border-top: 1px solid #707070;
        transform: rotate(135deg);
        &.active {
          border-right: 2px solid #004098;
          border-top: 2px solid #004098;
        }
      }
      .sub-menu-wrap {
        z-index: 600;
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        width: 140px;
        background: #fff;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.08),
          0 2px 6px 0 rgba(0, 0, 0, 0.05);
        .sub-menu {
          line-height: normal;
          font-size: 15px;
          padding: 8px;
          border-bottom: 1px solid rgb(234, 234, 234);
          &.active,
          &:hover {
            color: #004098;
          }
        }
      }
      &:hover {
        .menu-name {
          color: #004098;
        }
        .triangle {
          border-right: 2px solid #004098;
          border-top: 2px solid #004098;
        }
        .sub-menu-wrap {
          display: block;
          transition: display 0.4s ease;
        }
      }
      &.active {
        .menu-name {
          color: #004098;
        }
        border-bottom: 5px solid #004098;
      }
      &.pl {
        padding: 0 30px 0 20px;
      }
    }
    .menu-box {
      display: none;
      background: #004098;
      border-radius: 5px;
      width: 35px;
      height: 35px;
      margin-top: 22px;
      margin-right: 15px;
      .menu-img {
        width: 80%;
        padding-top: 3px;
      }
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 20px 0 25px;
    &::before {
      content: "";
      position: absolute;
      right: 150px; // 100px
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 40px;
      background: #333;
    }
    .share {
      display: block;
      display: flex;
      margin-top: 30px;
      .icon-link {
        display: inline-block;
      }
      .language-selector {
        border: none;
        font-size: 16px;
        cursor: pointer;
        outline: none;
        color: rgb(112, 112, 112);
      }
    }
    .icon-img {
      width: 20px;
      height: 20px;
      margin-right: 15px;
      cursor: pointer;
    }
    .language {
      display: flex;
      justify-content: right;
      align-items: center;
      color: #bfbfbf;
      .text {
        display: block;
      }
    }
  }
}

.menu-dialog {
  z-index: 2000;

  .dialog-content {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 40px 0 0;
    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: right;
      padding: 10px 15px;
      border-bottom: 1px solid rgb(245, 245, 245);
      .close-img {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }
    .menu-wrap {
      height: calc(100vh - 40px);
      overflow-y: auto;
    }
    .menu {
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid rgb(245, 245, 245);
      position: relative;
      .menu-name {
        padding: 10px 15px;
        color: #333;
      }
      .sub-menu-wrap {
        display: none;
        font-size: 15px;
        .sub-menu {
          padding: 10px 10px 10px 40px;
          font-size: 15px;
          border-top: 1px solid rgb(245, 245, 245);
          position: relative;
          .triangle {
            position: absolute;
            left: 25px;
            top: 17px;
            width: 6px;
            height: 6px;
            border-right: 1px solid #707070;
            border-top: 1px solid #707070;
            transform: rotate(45deg);
          }
          &.active,
          &:hover {
            color: #004098;
            .triangle {
              border-right: 1px solid #004098;
              border-top: 1px solid #004098;
            }
          }
        }
        &.active {
          display: block;
        }
      }
      .triangle-box {
        position: absolute;
        right: 15px;
        top: 10px;
        .triangle {
          width: 15px;
          height: 15px;
          transform: rotate(0deg);
          transition: transform 0.4s ease;
          &.active {
            transform: rotate(180deg);
            transition: transform 0.4s ease;
          }
        }
      }
      &.active {
        .menu-name {
          color: #004098;
        }
      }
      &:hover {
        .menu-name {
          color: #004098;
        }
        .sub-menu-wrap {
          opacity: 1;
          transition: opacity 0.4s ease;
        }
      }
    }
  }
}

// 1040px
@media screen and (max-width: 1150px) {
  .app-header {
    padding-right: 100px; //50px;
    .center {
      .menu {
        padding: 0 10px;
      }
    }
    .right {
      padding: 0 15px 0 20px;
      &::before {
        right: 100px; // 50px;
      }
      .share {
        //display: none;
        .icon-link {
          display: none;
        }
      }
      .language {
        margin-top: 30px;
        .text {
          display: none;
        }
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .app-header {
    .center {
      .menu {
        display: none;
      }
      .menu-box {
        display: block;
      }
    }
  }
}
//@media screen and (max-width: 500px) {
//  .app-header {
//    padding-right: 0px;
//    .right {
//      display: none;
//    }
//  }
//}
</style>
