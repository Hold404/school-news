<template>
  <main class="register">
    <form class="register-form">
      <h3 class="register__title">Registration</h3>
      <input type="text" v-model="name" class="register__input" placeholder="Name">
      <input type="text" v-model="surname" class="register__input" placeholder="Surname">
      <input type="email" v-model="email" class="register__input" placeholder="Email">
      <input type="password" v-model="password" class="register__input" placeholder="Password">
      <button class="register__button" type="submit" @click="register">Sign up</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {userInstance} from "@/api";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");

const { authorized } = storeToRefs(useUserStore());
const router = useRouter();

const register = (e: Event) => {
  e.preventDefault();

  userInstance.post('register', { name: name.value, surname: surname.value, email: email.value, password: password.value })
    .then((res) => {
      const token = res.data!.token;
      useUserStore().authUser(token, res.data!.reporter, router);
    })
    .catch((err) => {
      alert("Ошибка сервера. Попробуйте позже.")
    });
}

watch(authorized, function() {
 if (authorized.value) router.push("profile");
});
</script>

<style scoped lang="scss">
.register {
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