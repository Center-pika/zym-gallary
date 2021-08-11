<template>
  <div class="gallary" :style="this.heightStyle">
    <waterfall
      :col="col"
      :width="itemWidth"
      :gutterWidth="gutterWidth"
      :data="imgs"
      @loadmore="loadmore"
    >
      <template>
        <div class="cell-item" v-for="item in imgs" v-bind:key="item.name">
          <img v-if="item" :lazy-src="item['src']" alt="加载错误" />
        </div>
      </template>
    </waterfall>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Gallary",
  components: {},
  props: {
    collapsed: Boolean,
    base: String,
  },
  data() {
    return {
      imgs: [],
      all_imgs: [],
      group: 0,
      group_size: 15,
      height: window.innerHeight,
      col: 5
    };
  },
  methods: {
    getData() {
      axios.get(this.base + "static/data.json").then((res) => {
        this.all_imgs = res.data.map((x) => {
          x["src"] = this.base + "static/images/" + x["name"];
          x["href"] =
            this.base + "static/images/" + x["name"].replace("thumb_", "");
          return x;
        });
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
    loadmore(index) {
      console.log(index);
    },
    // clickHandler(event) {
    //   event.preventDefault();
    // },
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
    itemWidth() {
      return 138 * 0.5 * (document.documentElement.clientWidth / 375);
    },
    gutterWidth() {
      return 9 * 0.5 * (document.documentElement.clientWidth / 375);
    },
  },
};
</script>

<style scoped>
.info {
  color: aliceblue;
}
</style>
