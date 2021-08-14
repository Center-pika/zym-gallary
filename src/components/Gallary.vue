<template>
  <div class="gallary">
    <div class="month-block" v-for="(month, index) in months" :key="index">
      <div class="header">{{ month }} 月</div>
      <div
        v-masonry
        transition-duration="0.1s"
        item-selector=".item"
        columnWidth=".grid-sizer"
        gutter=".gutter-sizer"
        class="masonry-container"
      >
        <div
          v-masonry-tile
          class="grid-sizer"
          :style="{ width: itemWidth + '%' }"
        ></div>
        <div
          v-masonry-tile
          class="gutter-sizer"
          :style="{ width: gutterWidth + '%' }"
        ></div>
        <div
          v-masonry-tile
          class="item"
          v-bind:key="index"
          v-for="(item, index) in shownData[month]"
          :style="{ width: itemWidth + '%' }"
        >
          <a :href="item.href" target="tab"
            ><img :src="item.src" width="100%"
          /></a>
        </div>
      </div>
    </div>

    <div v-if="this.loading">Loading</div>
    <div v-if="this.allLoaded">
      <div class="row footer">
        <h3>Photoed By SNH-48 张月铭</h3>
        <p>Presented By 中心皮卡丘</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Gallary",
  components: {},
  props: {
    base: String,
  },
  data() {
    return {
      shownData: {},
      data: {},
      months: [],
      monthIdx: 0,
      width: window.innerWidth,
      loading: false,
      allLoaded: false,
    };
  },
  methods: {
    getData() {
      axios.get(this.base + "static/data2.json").then((res) => {
        var tmp = {};
        for (const month in res.data) {
          tmp[month] = [];
          for (const x in res.data[month]) {
            var item = res.data[month][x];
            item["src"] = this.base + "static/images/" + item["name"];
            item["href"] =
              this.base + "static/images/" + item["name"].replace("thumb_", "");
            tmp[month].push(item);
          }
        }
        this.months = Object.keys(res.data).sort((a, b) => {
          a < b;
        });
        this.data = tmp;
        this.loadMore();
      });
    },
    loadMore() {
      if (this.monthIdx >= this.months.length) {
        this.allLoaded = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      var tmp = {};
      let monthToLoad = this.months.slice(this.monthIdx, this.monthIdx + 2);
      for (const idx in monthToLoad) {
        let month = monthToLoad[idx];
        tmp[month] = this.data[month];
      }
      this.monthIdx += 2;
      this.shownData = Object.assign({}, tmp, this.shownData);
      this.loading = false;
    },
    scrollHandler() {
      let scrollHeight = window.scrollY;
      let maxHeight =
        window.document.body.scrollHeight -
        window.document.documentElement.clientHeight;

      if (scrollHeight >= maxHeight - 50) {
        if (!this.loading) {
          this.loadMore();
        }
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
    window.onscroll = this.scrollHandler;
  },
  computed: {
    itemWidth() {
      if (this.width > 1080) {
        return (100 - this.gutterWidth * 3) / 4;
      } else if (this.width > 720) {
        return (100 - this.gutterWidth * 2) / 3;
      } else {
        return (100 - this.gutterWidth) / 2;
      }
    },
    gutterWidth() {
      return 1.5;
    },
  },
};
</script>

<style scope>
.info {
  color: aliceblue;
}
.header {
  color: slategray;
  text-align: left;
  font-size: 30px;
  width: 100%;
  padding-left: 7px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.month-block {
  margin-left: 15px;
  margin-right: 15px;
}
.item {
  padding-bottom: 1.5%;
}
.item img {
  border-radius: 5px;
}
.footer {
  color: white;
}
</style>
