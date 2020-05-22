<template>
  <div id="app">
    <router-view/>
    <Nav/>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
