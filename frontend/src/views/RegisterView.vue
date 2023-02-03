<template>
  <main class="register">
    <form class="register-form">
      <h3 class="register__title">Reģistrācija</h3>
      <input type="text" class="register__input" placeholder="Vārds">
      <input type="text" class="register__input" placeholder="Uzvārds">
      <input type="email" class="register__input" placeholder="Ē-pasts">
      <input type="password" class="register__input" placeholder="Parole">
      <button class="register__button">Reģistrēties</button>
    </form>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.register {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    text-align: center;
  }
}
</style>