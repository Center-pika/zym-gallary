<template>
  <div class="aboud">
    <div class="container">
      <div class="row top-area" @click="avaterOnClick">
        <img
          :src="this.base + 'static/avatar.jpg'"
          class="avater rounded mx-auto"
        />
      </div>
      <div class="row info">
        <h1>张月铭</h1>
        <h3>SNH-48 十五期生</h3>
        <h3>SNH-48 Team HII</h3>
      </div>
      <div class="row alert">
        <div
          class="alert alert-primary mt-4 pb-4 col-md-4 offset-md-4"
          role="alert"
        >
          <h4 class="alert-heading">声明</h4>
          <hr />
          <p class="mb-0">
            本站为粉丝自发搭建的非盈利网站，记录张月铭的摄影作品和成长经历,除图源来自SNH-48张月铭女士外，其余均为粉丝个人行为
          </p>
        </div>
      </div>

      <div class="modal fade" ref="secret" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">咦？这是什么</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>你在博物馆中心的油画后发现了一个暗门，门后似乎是一个月台</p>
              <p>只要在石板上按下密码...</p>
              <div class="col-md-6 offset-md-3">
                <form>
                  <input :class="this.secretClass" ref="secretText" />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="checkSecret"
                  >
                    旋转石盘
                  </button>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  name: "About",
  props: {
    base: String,
  },
  data() {
    return {
      count: 0,
      modal: null,
      invalidSecret: false,
      secretClass: {
        "form-control": true,
        "mb-3": true,
        "is-valid": this.invalidSecret,
      },
    };
  },
  methods: {
    avaterOnClick() {
      this.count += 1;
      if (this.count == 5) {
        this.modal.show();
        this.count = 0;
      }
    },
    checkSecret() {
      let text = this.$refs.secretText.value;
      // validate text and get session
      if (text != "zymiao") {
        this.invalidSecret = true;
      } else {
        this.modal.hide();
        this.invalidSecret = false;
        this.$router.push("/secret");
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.secret);
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
.top-area,
.info,
.alert {
  margin-top: 70px;
}
</style>
