<template>
  <div class="secret">
    <div class="container">
      <div class="row"><h1>月亮列车停靠站</h1></div>

      <form
        action="http://121.36.164.142/api/uploads.php"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="mb-3 col-md-6 offset-md-3">
          <input
            class="form-control"
            type="file"
            id="file"
            name="files[]"
            ref="inputNode"
            multiple
            @change="updateData"
          />
        </div>
        <div class="header">预览</div>
        <div
          v-masonry
          transition-duration="0.1s"
          item-selector=".item"
          columnWidth=".grid-sizer"
          gutter=".gutter-sizer"
          class="masonry-container"
          v-if="this.localImages.length > 0"
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
            v-for="(item, index) in localImages"
            :style="{ width: itemWidth + '%' }"
          >
            <img :src="item" width="100%" />
            <a @click="removeFileFromFileList(index)"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#dc3545"
                class="bi bi-x-circle-fill delete-btn"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                ></path></svg
            ></a>
          </div>
        </div>
        <div v-else>
          <p>暂无待传数据</p>
        </div>
        <input
          type="submit"
          name="submit"
          class="btn btn-primary mb-3"
          value="提交"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Secret",
  props: {},
  data() {
    return {
      localImages: [],
      width: window.innerWidth,
    };
  },
  methods: {
    updateData(e) {
      if (e.target.files.length < this.localImages.length) {
        return;
      }
      for (let item of e.target.files) {
        if (!/image\/\w+/.test(item.type)) {
          continue;
        }
        var that = this;
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.addEventListener("load", function () {
          that.localImages.push(this.result);
        });
      }
    },
    removeFileFromFileList(index) {
      console.log("remove");
      const dt = new DataTransfer();
      const input = document.getElementById("file");
      const { files } = input;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (index !== i) {
          dt.items.add(file);
        }
      }
      input.files = dt.files;
      this.localImages.splice(index, 1);
    },
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
p {
  color: white;
}
.delete-btn {
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 100;
}
</style>
