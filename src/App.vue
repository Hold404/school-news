<template>
  <div class="wrapper">
    <Header class="header" />
    <RouterView class="content" />
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;

  .content {
    flex: 1 1 auto;
  }
}
</style>