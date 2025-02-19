<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="page">
    <div class="detail-box">
      <div class="title-box">
        <p class="title1">未来新型油墨</p>
        <p class="title2">
          UV干膠油墨、水性油墨、超微粒子油墨、热熔油墨、气雾喷涂油墨、有机硅油墨
        </p>
        <p class="editor">作者：岁月静好</p>
      </div>
      <div class="content">
        <p>
          随着科技的发展，新型油墨也开始兴起，为了满足不同用户的需求，新型油墨涉及到多种类型，包括UV干膠油墨、水性油墨、超微粒子油墨、热熔油墨、气雾喷涂油墨、有机硅油墨等。
        </p>
        <p>UV干膠油墨：</p>
        <p>
          UV干膠油墨是一种环保的油墨，它的特点是不含有VOC（挥发性有机化合物），可以在任何表面上使用，而且具有优异的耐久性，可以用于印刷电子元件、POP广告物料、金属表面等。
        </p>
        <p>水性油墨：</p>
        <p>
          水性油墨是一种高科技油墨，它的特点是不含VOC，具有优良的耐水性和耐腐蚀性，可以用于印刷纸张、塑料、木材、金属表面等。
        </p>
        <p>超微粒子油墨：</p>
        <p>
          超微粒子油墨是一种高分辨率的油墨，它的特点是印刷图案的尺寸小于50微米，可以用于印刷集成电路、微电子元件、微加工零部件等。
        </p>
        <p>热熔油墨：</p>
        <p>
          热熔油墨是一种特殊的油墨，它的特点是在印刷后可以通过加热形成一个完整的图案，可以用于印刷家电外壳、电脑外壳、手机外壳等。
        </p>
        <p>气雾喷涂油墨：</p>
        <p>
          气雾喷涂油墨是一种高效的油墨，它的特点是采用气体加速方式，可以在表面形成一个完整的图案，可以用于印刷集成电路、航天飞机外壳、工业机器外壳等。
        </p>
        <p>有机硅油墨：</p>
        <p>
          有机硅油墨是一种新型的油墨，它的特点是耐高温、耐腐蚀，可以用于印刷航天飞机外壳、工业机器外壳、电子元件及其他高要求表面印刷。
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.page {
  background: rgb(245, 245, 245);
  padding: 25px;
  .detail-box {
    background: #fff;
    padding: 20px;
    .title-box {
      .title1 {
        font-size: 24px;
        color: rgba(34, 34, 34, 1);
        line-height: 1;
        font-weight: bold;
        font-family: Arial;
        margin-bottom: 10px;
      }
      .title2 {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: normal;
        line-height: 1.5;
        padding-bottom: 20px;
        border-bottom: 1px solid #e7e7e7;
      }
      .editor {
        padding: 15px 0;
        text-align: right;
      }
    }
    .content {
      color: #666;
      line-height: 1.8;
      p {
        text-indent: 2em;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
