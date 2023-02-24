<template>
  <main class="login">
    <form class="login-form">
      <h3 class="login__title">Authorization</h3>
      <input type="email" class="login__input" placeholder="Email">
      <input type="password" class="login__input" placeholder="Password">
      <button class="login__button">Sign in</button>
    </form>
  </main>
</template>

<script setup lang="ts">

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
    color: #ff0000ba;
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
    border: 1px solid #ff0000ba;
    color: rgba(54, 6, 6, 0.73);

    outline: none;

    font-family: 'Inter', sans-serif;

    &::placeholder {
      color: #ff0000ba;
      opacity: 0.7;
    }
  }

  &__button {
    margin-top: 10px;
    height: 40px;

    background: #ff0000ba;
    border-radius: 10px;

    border: none;
    outline: none;

    color: white;
  }
}
</style>