<template>
  <div class="home">
    <h1 class="home__title">Bem-vindo ao Form Builder</h1>
    <div class="home__buttons">
      <Button
        class="home__button"
        text="Construir Formulário"
        @click="goToBuildForm"
      />
      <Button
        class="home__button"
        text="Preencher Formulário"
        @click="goToFillForm"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: 'Home',
  components: {
    Button,
  },
  methods: {
    goToBuildForm() {
      this.$router.push({ name: 'BuildForm' });
    },
    goToFillForm() {
      this.$router.push({ name: 'FillForm' });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.home {
  text-align: center;
  font-family: $font-family;

  &__title {
    font-size: 36px;
    margin-top: 40px;
    color: $primary-base;
  }

  &__buttons {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

}
</style>
