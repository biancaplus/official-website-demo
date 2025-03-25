<script setup>
import L from '@/utils/map/MapProvider.js';
import * as Icon from '@/assets/images/icon/config.js';
import markerIcon from '@/assets/images/icon/marker_red_sprite.png';
import axios from 'axios';
import { watch, onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useUserStore } from '@/store/user.js';
const userStore = useUserStore();

const contactInfo = ref({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
});
const map = ref(null);
const marker = ref(null);
const devicewidth = ref(0);

const submit = () => {
    axios
        .post('http://localhost:5281/api/Contact', contactInfo.value)
        .then(res => {
            //fire a toast
            showSuccessToast(t('success'));
            //clear the form
            contactInfo.value = {
                name: '',
                phone: '',
                email: '',
                company: '',
                message: ''
            };
        })
        .catch(err => {
            showFailToast(t('failed'));
        });
};

watch(devicewidth, newVal => {
    setCenter(newVal);
});

const currentTheme = computed(() => {
    return userStore.theme;
});
const currentTileLayer = ref(null);
watch(
    () => currentTheme.value,
    () => {
        changeTileLayer();
    }
);

function initMap() {
    map.value = new L.map('mapID', {
        center: [23.46, 116.58],
        zoom: 12,
        minZoom: 4,
        maxZoom: 18,
        layers: [],
        zoomControl: false,
        attributionControl: false
    });

    if (currentTheme.value === 'dark') {
        // Carto
        currentTileLayer.value = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 18,
            minZoom: 4
        }).addTo(map.value);
    } else {
        // 高德
        currentTileLayer.value = L.tileLayer
            .chinaProvider('GaoDe.Normal.Map', {
                maxZoom: 20,
                minZoom: 0
            })
            .addTo(map.value);
    }

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
        className: 'leaflet-icon-svg',
        iconSize: [24, 34]
    });

    marker.value = L.marker([22.517, 113.942], {
        icon: warningIcon
    }).addTo(map.value);

    setCenter(document.documentElement.clientWidth);
}
function setCenter(width) {
    if (width && map.value !== null) {
        if (width > 1200) {
            map.value.panTo([22.53, 113.82]);
        } else if (width <= 1200 && width > 960) {
            map.value.panTo([22.53, 113.83]);
        } else {
            map.value.panTo([22.517, 113.942]);
        }
    }
}
function changeTileLayer() {
    clearMap();
    initMap();
}
function clearMap() {
    if (map.value !== null) {
        map.value.remove();
        marker.value = null;
        currentTileLayer.value = null;
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
        <div class="header-title">{{ t('contact us') }}</div>
        <div class="contact-wrap">
            <div class="input-box">
                <van-field v-model="contactInfo.name" label="" required :placeholder="t('name') + '*'" class="contact-field mr10" />
                <van-field v-model="contactInfo.company" label="" :placeholder="t('company') + '*'" class="contact-field" />
            </div>
            <div class="input-box">
                <van-field v-model="contactInfo.phone" type="digit" label="" required :placeholder="t('phone') + '*'" class="contact-field mr10" />
                <van-field v-model="contactInfo.email" label="" required :placeholder="t('email')" class="contact-field" />
            </div>

            <div class="input-box">
                <van-field v-model="contactInfo.message" rows="7" autosize label="" type="textarea" :placeholder="t('message') + '*'" required class="contact-field" />
            </div>
            <div style="text-align: right">
                <van-button color="rgba(0, 64, 152, 0.8)" plain size="large" style="width: 100px" @click="submit">{{ t('submit') }}</van-button>
            </div>
        </div>
        <div class="info-wrap">
            <div class="title">{{ t('contact info') }}</div>
            <div class="info-box">
                <i class="fa-solid fa-location-dot icon-img"></i>
                <span>{{ t('address') }}</span>
            </div>
            <div class="info-box">
                <i class="fa-solid fa-phone-volume icon-img"></i>
                <span>0086-000-12345678</span>
            </div>
            <div class="info-box">
                <i class="fa-solid fa-envelope icon-img"></i>
                <span>XXX_company@gmail.com</span>
            </div>
        </div>
        <div id="mapID" class="map-wrap"></div>
    </div>
</template>

<style lang="scss" scoped>
.page {
    height: 100%;
    min-height: 500px;
    position: relative;
    background: var(--my-background-color-4);
}
.header-title {
    text-align: center;
    padding: 18px 0;
    background-color: var(--my-background-color-2);
    color: var(--van-text-color-3);
    font-size: 17px;
    font-weight: bold;
    display: none;
}
.contact-wrap {
    z-index: 500;
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
    z-index: 520;
    position: absolute;
    top: 60px;
    left: 550px;
    padding: 30px 20px;
    background: var(--van-background-color);
    -moz-box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.16); /* 老的 Firefox */
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.16);
    &::before {
        position: absolute;
        top: 45px;
        left: -19px;
        content: '';
        width: 0;
        height: 0;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        border-right: 20px solid var(--van-background-color);
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
        color: var(--my-text-color-4);
        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }
        .icon-img {
            width: 28px;
            height: 28px;
            line-height: 28px;
            margin-right: 15px;
            text-align: center;
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

@media screen and (max-width: 960px) {
    .page {
        height: auto;
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
