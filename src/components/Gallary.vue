<template>
  <div class="gallary" :style="this.heightStyle">
    <Waterfall :options="options">
      <WaterfallItem
        v-for="(item, index) in this.all_imgs['2021']['08']"
        :key="index"
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12 item"
      >
        <img :src="item['src']" />
      </WaterfallItem>
    </Waterfall>
    <!-- <div
        class="item"
        v-for="(item, index) in this.all_imgs['2021']['08']"
        :key="index"
      >
        <img :src="item['src']" />
      </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { Waterfall, WaterfallItem } from "vue2-waterfall";

export default {
  name: "Gallary",
  components: {},
  props: {
    collapsed: Boolean,
    base: String,
  },
  data() {
    return {
      // imgs: [],
      all_imgs: {},
      // group: 0,
      // group_size: 15,
      // height: window.innerHeight,
      // col: 4,
    };
  },
  methods: {
    getData() {
      axios.get(this.base + "static/data2.json").then((res) => {
        // this.all_imgs = res.data.map((x) => {
        //   x["src"] = this.base + "static/images/" + x["name"];
        //   x["href"] =
        //     this.base + "static/images/" + x["name"].replace("thumb_", "");
        //   return x;
        // });

        var data = {};
        for (const year in res.data) {
          data[year] = {};
          for (const month in res.data[year]) {
            data[year][month] = res.data[year][month].map((x) => {
              x["src"] = this.base + "static/images/" + x["name"];
              x["href"] =
                this.base + "static/images/" + x["name"].replace("thumb_", "");
              return x;
            });
          }
        }
        this.all_imgs = res.data;
        // this.loadImg();
      });
    },
    // loadImg() {
    //   if (this.group == this.n_groups) {
    //     this.$refs.waterfall.waterfallOver();
    //     return;
    //   }
    //   let start = this.group * this.group_size;
    //   this.imgs = this.imgs.concat(
    //     this.all_imgs.slice(start, start + this.group_size)
    //   );
    //   this.group++;
    // },
    // loadmore(index) {
    //   console.log(index);
    // },
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
