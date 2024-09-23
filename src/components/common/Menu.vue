<template>
  <div class="menu" @click.stop="toggleMenu">
    <button
      class="menu__icon"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      aria-label="Menu"
    >
      &#8942;
    </button>
    <transition name="menu-fade">
      <ul
        v-if="isOpen"
        class="menu__dropdown"
        role="menu"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="menu__item"
          @click.stop="handleAction(item.action)"
          role="menuitem"
        >
          {{ item.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    handleAction(action) {
      this.$emit(action);
      this.isOpen = false;
    },
    closeMenu() {
      this.isOpen = false;
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closeMenu();
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeMenu);
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeMenu);
    document.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.menu {
  position: relative;
  display: inline-block;

  &__icon {
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    user-select: none;
  }

  &__dropdown {
    position: absolute;
    right: 0;
    background-color: $background-color;
    border: 1px solid lighten($text-color, 70%);
    border-radius: $border-radius;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    list-style: none;
    padding: 8px 0;
    margin: 8px 0 0 0;
    z-index: 1000;

    .menu__item {
      padding: 8px 16px;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background-color: lighten($primary-base, 50%);
      }
    }
  }
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s;
}
.menu-fade-enter,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
