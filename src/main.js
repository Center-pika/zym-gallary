import Vue from 'vue'
import App from './App.vue'
import router from './router'


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

var ghpages = require('gh-pages');
ghpages.publish('dist');
