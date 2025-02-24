<style lang="scss" scoped>
.svg-icon {
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
}
</style>

<template>
  <svg
    class="svg-icon"
    version="1.1"
    :width="width"
    :height="height"
    :viewBox="viewBox"
  >
    <image
      id="loc1"
      xlink:href="@/assets/images/icon/marker_red_sprite.png"
      preserveAspectRatio="none"
      x="0"
      y="20"
      width="24"
      height="14"
    ></image>
  </svg>
</template>

<script>
// vue
export default {
  props: {
    width: {
      type: Number,
      required: false,
      default: 64,
    },
    height: {
      type: Number,
      required: false,
      default: 64,
    },
  },
  computed: {
    viewBox: {
      get() {
        return "0, 0, " + this.width + ", " + this.height;
      },
    },
  },
};
</script>
