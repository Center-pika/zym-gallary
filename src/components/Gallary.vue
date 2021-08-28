<template>
  <div class="gallary">
    <div class="month-block" v-for="(month, index) in shownMonths" :key="index">
      <div class="header">{{ month }} 月</div>
      <div
        v-masonry
        transition-duration="0.2s"
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
          <a :href="base + 'images/' + item.src" target="tab">
            <img
              :src="
                item.src in loaded
                  ? base + 'images/' + item.thumb
                  : 'https://via.placeholder.com/1/41464c?text=+'
              "
              width="100%"
              :style="'aspect-ratio:' + 1/item.ratio"
              :name="item.src"
              @load="imageFinishLoading"
            />
          </a>
        </div>
      </div>
    </div>

    <div v-if="this.loading">
      <p>Loading...</p>
    </div>
    <div v-if="this.allLoaded">
      <div class="row footer w-100">
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
      loaded: {},
      virtual_height: {},
      months: [],
      shownMonths: [],
      width: window.innerWidth,
      loading: false,
      allLoaded: false,
    };
  },
  methods: {
    getData() {
      let that = this;
      this.months = [];
      this.loaded = {};
      this.virtual_height = {};
      axios.get("/api/gallary.php").then((res) => {
        var tmp = {};
        for (const index in res.data) {
          let item = res.data[index];
          let month = item.month;
          if (!(month in tmp)) {
            tmp[month] = [];
            that.months.push(month);
          }
          tmp[month].push(item);
          that.virtual_height[item.src] = Math.random() * 50 + 100;
        }
        that.months = that.months.sort((a, b) => {
          a > b;
        });
        that.data = tmp;
        that.loadMore();
      });
    },
    loadMore() {
      if (this.months.length == 0) {
        this.allLoaded = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      var tmp = {};
      for (let i = 0; i < 2; i++) {
        let month = this.months.shift();
        if (month) {
          tmp[month] = this.data[month];
          this.shownMonths.push(month);
        }
      }
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
    imageFinishLoading(e) {
      this.$set(this.loaded, e.target.name, true)
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
.footer,
.month-block {
  margin-left: 12px;
  margin-right: 12px;
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
