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
        <div v-lazy-container="{ selector: 'img' }">
          <div
            v-masonry-tile
            class="item"
            v-bind:key="index"
            v-for="(item, index) in shownData[month]"
            :style="{ width: itemWidth + '%' }"
          >
            <div
              :style="{
                width: '100%',
                'padding-bottom': item.ratio * 100 + '%',
              }"
              class="img-wrapper"
            >
              <a :href="base + 'images/' + item.src" target="tab">
                <img
                  :data-src="base + 'images/' + item.thumb"
                  width="100%"
                  class="fadein"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.loading">
      <p>Loading...</p>
    </div>
    <div v-if="this.allLoaded" :style="'width:95%'">
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
.item .img-wrapper {
  border-radius: 5px;
}
.footer {
  color: white;
}
.item .img-wrapper {
  background-color: #41464c;
}
.img-wrapper img {
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  border-radius: 5px;
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadein[lazy="loaded"] {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
</style>
