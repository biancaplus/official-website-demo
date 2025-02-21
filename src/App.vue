<script setup>
import AppHeader from "@/components/components/AppHeader.vue";
</script>

<template>
  <div class="header-wrap">
    <app-header></app-header>
  </div>
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
$header-height: 80px;
.header-wrap {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.page-wrap {
  position: absolute;
  top: $header-height;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}
</style>
