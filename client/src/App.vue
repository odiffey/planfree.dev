<template>
  <div id="app" :style="`--primary-color: ${primaryColor}`">
    <title>Planning Poker</title>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {
  public primaryColor = process.env.VUE_APP_PRIMARY_COLOR || '#54e8dd';
}
</script>

<style lang="scss">

html, body {
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  background: #f3f0f1;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
