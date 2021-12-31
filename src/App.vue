<template>
  <div id="app">
    <div class="container-fluied" id="content">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <span class="navbar-brand nav-title" href="#">启铭星博物馆</span>
        <button
          class="navbar-toggler toggle-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
              <ul
                class="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <router-link :to="{name: 'Gallary-year', params: { year: '2022' }}" class="dropdown-item">
                    2022 峨眉月
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name: 'Gallary-year', params: { year: '2021' }}"  class="dropdown-item"
                    >2021 新月</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item" v-if="this.$store.getters.login">
              <router-link to="/secret" class="nav-link">Secret</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view :base="this.base" :key="$route.path"/>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      base: "http://121.36.164.142/",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app {
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
