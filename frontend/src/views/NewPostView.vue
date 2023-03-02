<template>
  <main class="newpost">
    <form class="newpost-form">
      <h3 class="newpost__title">New post</h3>
      <input type="text" v-model="title" class="newpost__input" placeholder="Post title">
      <textarea type="text" v-model="text" class="newpost__textarea" placeholder="Post text" />
      <button class="newpost__button" type="submit" @click="newpost">Create</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {defaultInstance, userInstance} from "@/api";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const title = ref("");
const text = ref("");

const { reporter } = storeToRefs(useUserStore());

const router = useRouter();

const newpost = (e: Event) => {
  e.preventDefault();

  defaultInstance.post('posts/create', { title: title.value, text: text.value })
    .then((res) => {
      router.push("/");
    })
    .catch((err) => {
      alert("Ошибка.");
    });
}

if (!reporter.value) router.push("/");
</script>

<style scoped lang="scss">
.newpost {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    margin-top: unset;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    color: rgba(23, 23, 23, 1);
  }

  &-form {
    * { display: block }

    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 8px;
  }

  &__input {
    width: 220px;
    height: 40px;

    padding-left: 10px;

    border-radius: 5px;
    border: 1px solid rgba(23, 23, 23, 0.73);
    color: black;

    outline: none;

    font-family: 'Inter', sans-serif;
    font-size: 13px;

    &::placeholder {
      color: rgba(23, 23, 23, 0.73);
    }
  }

  &__textarea {
    width: 218px;
    height: 80px;

    resize: vertical;

    border-radius: 5px;
    border: 1px solid rgba(23, 23, 23, 0.73);
    color: black;

    padding-left: 10px;
    padding-top: 10px;

    outline: none;

    font-family: 'Inter', sans-serif;
    font-size: 13px;

    &::placeholder {
      color: rgba(23, 23, 23, 0.73);
    }
  }

  &__button {
    margin-top: 10px;
    height: 40px;

    background: rgba(23, 23, 23, 1);
    border-radius: 10px;

    border: none;
    outline: none;

    color: white;
  }
}
</style>