<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="page">
    <div class="header-title">{{ t("about us") }}</div>
    <div class="page-main">
      <div class="title-1">
        <span class="blue">SINCE</span>
        <span class="red">2004</span>
      </div>
      <div class="title-2">{{ t("company name") }}</div>
      <div class="content">
        <p class="p-text">
          {{ t("company-introduce1") }}
        </p>
        <p class="p-text">
          {{ t("company-introduce2") }}
        </p>
      </div>
      <img src="@/assets/images/about-us/公司.png" alt="" class="img" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/mixin.scss";
.page {
  width: 100%;
  height: 100%;
  // min-height: 500px;
  // padding: 30px 20px;
  .page-main {
    width: 80%;
    height: 100%;
    padding: 30px 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
@include header-title-class;
.title-1 {
  font-size: 22px;
  font-weight: bold;
  .blue {
    color: #3dc9ea;
    margin-right: 10px;
  }
  .red {
    color: #e74c3c;
  }
}
.title-2 {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}
.content {
  .p-text {
    color: #000;
    font-size: 18px;
    color: rgba(102, 102, 102, 1);
    text-indent: 2em;
    line-height: 2.5;
  }
}
.img {
  width: 100%;
  margin: 30px 0;
}

@media screen and (max-width: 1040px) {
  .page .page-main {
    width: 90%;
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
    width: 95%;
  }
}
</style>
