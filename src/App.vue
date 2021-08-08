<template>
  <div id="app">
    <div class="container-fluied" id="content">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <span class="navbar-brand nav-title" href="#">张月铭博物馆</span>
        <button
          class="navbar-toggler toggle-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="heightCheck"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gallary
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                <li>
                  <router-link to="/zym-gallary" class="dropdown-item"
                    >2021 起航</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view :collapsed="this.collapsed" :base="this.base" />
  </div>
</template>
<script>
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      collapsed: true,
      base: process.env.BASE_URL,
    };
  },
  methods: {
    heightCheck(e) {
      var node = e.target;
      if (node.tagName == "SPAN") {
        node = node.parentElement;
      }
      this.collapsed = node.className.indexOf("collapsed") >= 0;
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 97%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #262d33;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.nav-title {
  padding-left: 20px;
}
.toggle-button {
  margin-right: 20px;
}
</style>
