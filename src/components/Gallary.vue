<template>
  <div class="gallary">
    <div v-for="(imgs, idx) in [this.imgs, this.imgs2]" :key="idx">
      <div class="header">Section {{ idx + 1 }}</div>
      <Waterfall :options="options">
        <WaterfallItem
          v-for="(item, index) in imgs"
          :key="index"
          class="col-lg-3 col-md-4 col-sm-6 col-xs-6 item"
        >
          <div class="pad"></div>
          <img :src="item['src']"/>
        </WaterfallItem>
      </Waterfall>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Waterfall, WaterfallItem } from "vue2-waterfall";

export default {
  name: "Gallary",
  components: {
    Waterfall,
    WaterfallItem,
  },
  props: {
    collapsed: Boolean,
    base: String,
  },
  data() {
    return {
      imgs: [],
      all_imgs: {},
      options: {
        itemSelector: ".item",
      },
    };
  },
  methods: {
    getData() {
      axios.get(this.base + "static/data2.json").then((res) => {
        for (const month in res.data) {
          this.all_imgs[month] = res.data[month].map((x) => {
            x["src"] = this.base + "static/images/" + x["name"];
            x["href"] =
              this.base + "static/images/" + x["name"].replace("thumb_", "");
            return x;
          });
        }
        this.imgs = this.all_imgs["08"];
        this.imgs2 = this.all_imgs["07"];
      });
    },
  },
  created() {
    this.getData();
  },
  computed: {},
};
</script>

<style scope>
.info {
  color: aliceblue;
}
.header {
  color: aliceblue;
  text-align: left;
  font-size: 35px;
  width: 100%;
  padding-left: 7px;
}
.pad {
  height: 6px;
}
.item img {
  width: 100%;
}
</style>
