<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="page">
    <div class="header-title">关于我们</div>
    <div class="page-main">
      <div class="title-1">
        <span class="blue">SINCE</span>
        <span class="red">2004</span>
      </div>
      <div class="title-2">上海牡丹油墨有限公司</div>
      <div class="content">
        <p class="p-text">
          上海牡丹油墨有限公司，是集研发、生产和销售印刷油墨于一体的专业制造企业，渊源最早可追溯至1913年始建的中国油墨厂——中国民族油墨工业的鼻祖，迄今已有逾百年的历史。
        </p>
        <p class="p-text">
          作为上海制皂(集团)有限公司的全资子公司，牡丹油墨总部位于上海市杨树浦路2310号，拥有北外滩地块以航运为特色、商贸办公发达的得天独厚的城区优势，着力于产品的设计研发以及品牌的运营和市场拓展，通过传承传统核心技术和创新研发高新技术相结合的形式，以不断提高与发展自主品牌产品核心竞争力，积极推动提升企业自主品牌的创新体系综合能力，作为企业长期立身和发展之本。
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
  margin-bottom: 30px;
}

@media screen and (max-width: 1040px) {
  .page .page-main {
    width: 90%;
  }
}

@media screen and (max-width: 920px) {
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
