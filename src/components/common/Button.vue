<template>
  <button class="button" @click="$emit('click')" :type="type">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.button {
  background-color: $primary-base;
  color: $text-color-light;
  padding: 8px 16px;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  font-family: $font-family;

  &:hover {
    background-color: $primary-darken1;
  }
}
</style>
