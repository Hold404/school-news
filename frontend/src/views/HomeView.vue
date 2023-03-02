<template>
  <main class="home">
    <div class="container">
      <div class="home-inner">
        <Article v-for="article in articles" :id="article.id" :title="article.title" :text="article.text" :views="article.views" :key="article.id" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useArticleStore} from "@/stores/articles";
import {storeToRefs} from "pinia";

import School from "@/assets/school.jpg";
import Article from "@/components/Article.vue";
import {ref, toRaw, watch} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

const { articles } = storeToRefs(useArticleStore());
</script>

<style scoped lang="scss">
.home {
  &-inner {
    padding: 0 15px;

    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
}
</style>