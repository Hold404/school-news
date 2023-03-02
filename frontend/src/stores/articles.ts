import { defineStore } from "pinia";
import {ref, toRaw} from "vue";
import {defaultInstance} from "@/api";

export const useArticleStore = defineStore("articles", () => {
  const articles = ref([]);
  const setArticles = (articleList: Array<object>) => {
    // @ts-ignore
    articles.value = articleList;
  }

  defaultInstance.get("posts/getAll")
    .then(res => {
      setArticles(res.data)
    })
    .catch(e => { console.log(e) });

  return { articles, setArticles }
});