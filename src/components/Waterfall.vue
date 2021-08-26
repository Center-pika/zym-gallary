<template>
  <div class="waterfall">
    <div class="block" v-for="(title, index) in data" :key="index">
      <div class="header">{{ title }}</div>
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
          :style="{ width: defaultItemWidth + '%' }"
        ></div>
        <div
          v-masonry-tile
          class="gutter-sizer"
          :style="{ width: defaultGutterWidth + '%' }"
        ></div>
        <div
          v-masonry-tile
          class="item"
          v-bind:key="index"
          v-for="(item, index) in shownData[month]"
          :style="{ width: defaultItemWidth + '%' }"
        >
          <a :href="item.href" target="tab"
            ><img :src="item.src" width="100%"
          /></a>
        </div>
      </div>
    </div>

    <div v-if="this.loading">
      <p>Loading</p>
    </div>
    <div v-if="this.allLoaded">
      <div class="row footer">
        <p>Footer</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Waterfall",
  props: {},
  data() {
    return {
      data: {},
      width: window.innerWidth,
    };
  },
  methods: {},
  computed: {
    defaultItemWidth() {
      if (this.width > 1080) {
        return (100 - this.defaultGutterWidth * 3) / 4;
      } else if (this.width > 720) {
        return (100 - this.defaultGutterWidth * 2) / 3;
      } else {
        return (100 - this.defaultGutterWidth) / 2;
      }
    },
    defaultGutterWidth() {
      return 1.5;
    },
  },
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
  },
};
</script>

<style scoped>
h1,
h3 {
  color: aliceblue;
}
.row {
  margin-top: 70px;
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
.block {
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
