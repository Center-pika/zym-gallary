<template>
  <div class="gallary" :style="this.heightStyle">
    <waterfall
      ref="waterfall"
      :imgsArr="imgs"
      @scrollReachBottom="loadImg"
      @click="clickHandler"
      :imgWidth="280"
      :maxCols="6"
    >
      <div slot="waterfall-over">
        <h5>Photoed By ZYM</h5>
        <p>Presented By 中心皮卡丘</p>
      </div>
    </waterfall>
  </div>
</template>

<script>
import waterfall from "vue-waterfall-easy";
import axios from "axios";

export default {
  name: "Gallary",
  components: {
    waterfall,
  },
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      imgs: [],
      all_imgs: [],
      group: 0,
      group_size: 15,
      height: window.innerHeight,
    };
  },
  methods: {
    getData() {
      axios.get("./static/data.json").then((res) => {
        // this.all_imgs = res.data
        this.all_imgs = res.data
        this.loadImg();
      });
    },
    loadImg() {
      if (this.group == this.n_groups) {
        this.$refs.waterfall.waterfallOver();
        return;
      }
      let start = this.group * this.group_size;
      this.imgs = this.imgs.concat(
        this.all_imgs.slice(start, start + this.group_size)
      );
      this.group++;
    },
    clickHandler(event) {
      event.preventDefault();
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    window.onresize = () => {
      this.height = window.innerHeight;
    };
  },
  computed: {
    n_groups() {
      return Math.ceil(this.all_imgs.length / this.group_size);
    },
    heightStyle() {
      return {
        height: this.collapsed ? "100%" : "90%",
      };
    },
  },
};
</script>

<style scoped>
</style>
