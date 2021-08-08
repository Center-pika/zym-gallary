<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <img
          :src="this.base + 'static/avatar.jpg'"
          class="avater rounded mx-auto"
        />
      </div>
      <div class="row">
        <h1>张月铭</h1>
        <h3>SNH-48 十五期生</h3>
        <h3>SNH-48 Team HII</h3>
      </div>
      <div class="alert alert-primary mt-4" role="alert">
        <h4 class="alert-heading">声明</h4>
        <hr />
        <p class="mb-0">
          本站为粉丝自发搭建，记录张月铭的摄影作品和成长经历,除图源来自SNH-48张月铭女士外，其余均为粉丝个人行为
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    base: String,
  },
};
</script>

<style scoped>
h1,
h3 {
  color: aliceblue;
}
.avater {
  height: 80%;
  width: 80%;
}
.row {
  margin-top: 70px;
}
</style>
