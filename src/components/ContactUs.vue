<script setup>
import L from "@/utils/map/MapProvider.js";
import * as Icon from "@/assets/images/icon/config.js";
import markerIcon from "@/assets/images/icon/marker_red_sprite.png";

import { watch, onMounted, onBeforeUnmount, ref } from "vue";

const contactInfo = ref({
  name: "",
  phone: "",
  email: "",
  company: "",
  message: "",
});
const map = ref(null);
const marker = ref(null);
const devicewidth = ref(0);

watch(devicewidth, (newVal) => {
  setCenter(newVal);
});

function initMap() {
  map.value = new L.map("mapID", {
    center: [23.46, 116.58],
    zoom: 12,
    minZoom: 4,
    maxZoom: 18,
    layers: [],
    zoomControl: false,
    attributionControl: false,
  });

  L.tileLayer
    .chinaProvider("GaoDe.Normal.Map", {
      maxZoom: 20,
      minZoom: 0,
    })
    .addTo(map.value);

  // L.marker([23.422115, 116.734096])
  //   .addTo(map.value)
  //   .bindPopup("我们在这")
  //   .openPopup();

  const svgIcon = `
  <svg
    class="svg-icon"
    version="1.1"
    width="24"
    height="34"
    viewBox="0 0 24 34"
  >
    <style>
        #loc1 {
          animation: moveLoc1Icon1 0.4s linear infinite alternate;
        }
        @keyframes moveLoc1Icon1 {
          0% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
    </style>
    <image
      id="loc1"
      xlink:href="${markerIcon}"
      preserveAspectRatio="none"
      x="0"
      y="20"
      width="24"
      height="14"
    ></image>
  </svg>`;
  const warningIcon = L.divIcon({
    html: svgIcon,
    className: "leaflet-icon-svg",
    iconSize: [24, 34],
  });

  marker.value = L.marker([23.4164, 116.7274], {
    icon: warningIcon,
  }).addTo(map.value);

  setCenter(document.documentElement.clientWidth);
}
function setCenter(width) {
  if (width && map.value !== null) {
    if (width > 1200) {
      map.value.panTo([23.46, 116.58]);
    } else if (width <= 1200 && width > 920) {
      map.value.panTo([23.46, 116.64]);
    } else {
      map.value.panTo([23.4164, 116.7274]);
    }
  }
}
function clearMap() {
  if (map.value !== null) {
    map.value.remove();
    marker.value = null;
  }
}

onMounted(() => {
  window.onresize = () => {
    return (() => {
      devicewidth.value = document.documentElement.clientWidth;
    })();
  };
  initMap();
});
onBeforeUnmount(() => {
  clearMap();
});
</script>

<template>
  <div class="page">
    <div class="header-title">联系我们</div>
    <div class="contact-wrap">
      <div class="input-box">
        <van-field
          v-model="contactInfo.name"
          label=""
          required
          placeholder="姓名*"
          class="contact-field mr10"
        />
        <van-field
          v-model="contactInfo.company"
          label=""
          placeholder="公司"
          class="contact-field"
        />
      </div>
      <div class="input-box">
        <van-field
          v-model="contactInfo.phone"
          type="digit"
          label=""
          required
          placeholder="电话*"
          class="contact-field mr10"
        />
        <van-field
          v-model="contactInfo.email"
          label=""
          required
          placeholder="邮箱*"
          class="contact-field"
        />
      </div>

      <div class="input-box">
        <van-field
          v-model="contactInfo.message"
          rows="7"
          autosize
          label=""
          type="textarea"
          placeholder="留言*"
          required
          class="contact-field"
        />
      </div>
      <div style="text-align: right">
        <van-button
          color="rgba(0, 64, 152, 0.8)"
          plain
          size="large"
          style="width: 100px"
          >发送</van-button
        >
      </div>
    </div>
    <div class="info-wrap">
      <div class="title">联系信息</div>
      <div class="info-box">
        <img :src="Icon.定位" alt="" class="icon-img" />
        <span>上海市杨树浦路2310号</span>
      </div>
      <div class="info-box">
        <img :src="Icon.电话" alt="" class="icon-img" />
        <span>0086-021-23535836</span>
      </div>
      <div class="info-box">
        <img :src="Icon.邮箱" alt="" class="icon-img" />
        <span>Sales_peony@shhuayi.com</span>
      </div>
    </div>
    <div id="mapID" class="map-wrap"></div>
  </div>
</template>

<style lang='scss' scoped>
@import "@/assets/mixin.scss";
.page {
  height: 100%;
  min-height: 500px;
  position: relative;
}
@include header-title-class;
.contact-wrap {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 100px;
  background: rgba(0, 64, 152, 0.15);
  width: 450px;
  height: 100%;
  padding: 40px 30px;
  .input-box {
    display: flex;
    .van-field {
      margin-bottom: 20px;
    }
  }
}
.info-wrap {
  z-index: 1001;
  position: absolute;
  top: 60px;
  left: 550px;
  padding: 30px 20px;
  background: #fff;
  -moz-box-shadow: 0px 0px 8px 2px #c7c7c7; /* 老的 Firefox */
  box-shadow: 0px 0px 8px 2px #c7c7c7;
  &::before {
    position: absolute;
    top: 45px;
    left: -19px;
    content: "";
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-right: 20px solid #fff;
  }
  .title {
    font-size: 18px;
    color: #888888;
    margin-bottom: 15px;
  }
  .info-box {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
    .icon-img {
      width: 28px;
      height: 28px;
      margin-right: 15px;
    }
  }
}
.map-wrap {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1040px) {
  .page {
    .contact-wrap {
      left: 30px;
    }
    .info-wrap {
      top: 40px;
      left: 480px;
      padding: 20px 15px;
      .info-box {
        margin-bottom: 10px;
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 920px) {
  .page {
    .header-title {
      display: block;
    }
    .contact-wrap {
      position: relative;
      top: inherit;
      left: inherit;
      width: 100%;
      height: auto;
    }
    .info-wrap {
      position: relative;
      top: inherit;
      left: inherit;
      margin: 30px 0;
      &::before {
        display: none;
      }
    }
    .map-wrap {
      height: 400px;
    }
  }
}
</style>
