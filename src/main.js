import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { VueMasonryPlugin } from "vue-masonry";
import VueLazyload from 'vue-lazyload'

Vue.use(VueMasonryPlugin);
Vue.use(VueLazyload, {
  preLoad: 1.3
})

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// var ghpages = require('gh-pages');
// ghpages.publish('dist');
