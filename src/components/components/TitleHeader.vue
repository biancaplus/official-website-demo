<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="title-header-wrap">
    <h2 class="title">
      <span>{{ props.title }}</span>
    </h2>
    <div class="header-border">
      <div class="separator"></div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.title-header-wrap {
  width: 100%;
  margin-bottom: 20px;
  .title {
    color: #848484;
    font-family: "Open Sans", Hind;
    font-weight: 200;
    margin: 0;
    margin-bottom: 15px;
  }
  .header-border {
    width: 100%;
    height: 1px;
    background: rgb(234, 234, 234);
    .separator {
      width: 48px;
      height: 1px;
      background: rgb(0, 64, 152);
    }
  }
}
</style>
