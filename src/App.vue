<template>
  <navbar />
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.main-container {
  position: relative;
  top: 50px;
}
</style>
