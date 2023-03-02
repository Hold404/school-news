<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <router-link class="header__logo" to="/"><div class="header__logo">SchoolNews</div></router-link>

        <nav class="header__nav nav">
          <ul class="nav__list">
            <li class="nav__item">
              <router-link
                class="nav__link"
                to="/"
                >Main page</router-link
              >
            </li>
            <li class="nav__item">
              <router-link
                to="/signin"
                class="nav__link"
                v-if="!authorized"
                >Authorization</router-link
              >
              <router-link
                to="/newpost"
                class="nav__link"
                v-if="authorized && reporter"
                >New post</router-link
              >
            </li>
            <li class="nav__item" v-if="!authorized">
              <router-link
                to="/signup"
                class="nav__link"
              >Registration</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { authorized, reporter } = storeToRefs(useUserStore());
</script>

<style scoped lang="scss">
.header {
  a { text-decoration: none }

  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  &-inner {
    padding: 0 15px;
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .nav {
      &__list {
        display: flex;
        list-style: none;
      }

      &__item {
        &:last-child {
          margin-right: unset;
        }
        margin-right: 20px;
      }

      &__link {
        text-decoration: none;
        font-family: 'Inter', sans-serif;
        font-size: 17px;
        color: rgba(0, 0, 0, 0.7);

        position: relative;

        &:hover {
          color: black;
          transition: all ease .5s;
        }
      }
    }
  }

  .router-link-active {
    color: black;
    transition: all ease .5s;
  }

  &__logo {
    font-family: "Sofia Sans Semi Condensed", sans-serif;
    font-size: 35px;
    font-weight: 800;
    color: rgba(23, 23, 23, 1);
  }
}
</style>
