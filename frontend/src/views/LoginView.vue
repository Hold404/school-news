<template>
  <main class="login">
    <form class="login-form">
      <h3 class="login__title">Authorization</h3>
      <input type="email" v-model="email" class="login__input" placeholder="Email">
      <input type="password" v-model="password" class="login__input" placeholder="Password">
      <button class="login__button" type="submit" @click="login">Sign in</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {userInstance} from "@/api";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const email = ref("");
const password = ref("");

const { authorized } = storeToRefs(useUserStore());
const router = useRouter();

const login = (e: Event) => {
  e.preventDefault();

  userInstance.post('login', { email: email.value, password: password.value })
    .then((res) => {
      const token = res.data!.token;
      useUserStore().authUser(token, res.data!.reporter, router);
    })
    .catch((err) => {
      alert("Неверный логин или пароль");
    });
}

watch(authorized, function() {
  if (authorized.value) router.push("/");
});
</script>

<style scoped lang="scss">
.login {
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