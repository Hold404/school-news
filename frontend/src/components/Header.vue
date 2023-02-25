<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="header__logo">SchoolNews</div>

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
                to="#"
                class="nav__link"
                v-else
                >Profile</router-link
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

const { authorized } = storeToRefs(useUserStore());
</script>

<style scoped lang="scss">
.header {
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

        transition: all ease 1s;

        &_active {
          &::before {
            content: "";
            background: #ff0000ba;
            width: 10px;
            height: 2px;
            border-radius: 10px;
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            margin: 0 auto;
            transition: all ease 1s;
          }
        }

        &:hover {
          color: black;

          &::before {
            content: "";
            background: #ff0000ba;
            width: 10px;
            height: 2px;
            border-radius: 10px;
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            margin: 0 auto;
            transition: all ease 0.5s;
          }
        }
      }
    }
  }

  .router-link-active {
    &::before {
      content: "";
      background: #ff0000ba;
      width: 10px;
      height: 2px;
      border-radius: 10px;
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      margin: 0 auto;
      transition: all ease 0.5s;
    }
  }

  &__logo {
    font-family: "Sofia Sans Semi Condensed", sans-serif;
    font-size: 35px;
    font-weight: 800;
    color: rgba(23, 23, 23, 1);
  }
}
</style>
