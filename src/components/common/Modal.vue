<template>
  <div class="modal">
    <div class="modal__overlay" @click="close"></div>
    <div class="modal__content">
      <button class="modal__close-button" @click="close">&times;</button>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &__content {
    position: relative;
    width: 600px;
    max-width: 90%;
    margin: 100px auto;
    background: $background-color;
    padding: 20px;
    border-radius: $border-radius;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    font-family: $font-family;
    max-height: 70vh;
    overflow: auto;
  }

  &__close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: $text-color;
  }

  &__body {
    margin-top: 20px;
  }
}
</style>
