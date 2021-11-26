<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
    <footer-menu id="footer"></footer-menu>
  </div>
</template>
<script>
import NavHeader from "@/components/layout/Header.vue";
import FooterMenu from "@/components/layout/Footer.vue";
export default {
  name: "App",
  components: {
    NavHeader,
    FooterMenu,
  },
};
</script>
<style>
body {
  width: 100%;
  margin:0;
  max-width: none !important;
}
#footer {
  position: absolute;
  width: 100%;
  background-color: black;
  opacity: 0.8;
  color: whitesmoke;
}
</style>
