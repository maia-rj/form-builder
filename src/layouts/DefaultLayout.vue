<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__header-content">
        <div
          class="layout__logo-container"
          @click="$router.push({ name: 'Home' })"
        >
          <img
            src="https://beyondcompany.com.br/img/logo.62069458.svg"
            alt="Logo"
            class="layout__logo"
          />
        </div>
        <!-- Ícone de menu para dispositivos móveis -->
        <div
          class="layout__menu-icon"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Menu"
        >
          &#9776;
        </div>
        <nav class="layout__nav" :class="{ 'layout__nav--open': isMenuOpen }">
          <ul class="layout__nav-list">
            <li class="layout__nav-item">
              <router-link
                to="/"
                class="layout__nav-link"
                exact-active-class="layout__nav-link--active"
                >Home</router-link
              >
            </li>
            <li class="layout__nav-item">
              <router-link
                to="/build"
                class="layout__nav-link"
                active-class="layout__nav-link--active"
                >Construtor</router-link
              >
            </li>
            <li class="layout__nav-item">
              <router-link
                to="/fill"
                class="layout__nav-link"
                active-class="layout__nav-link--active"
                >Formulário</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="layout__content">
      <router-view></router-view>
    </main>
    <footer class="layout__footer">
      <p>&copy; {{ new Date().getFullYear() }} Form Builder</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $background-color;
  color: $text-color;
  font-family: $font-family;

  &__header {
    background-color: $background-color;
    padding: 16px;
    border-bottom: 1px solid lighten($text-color, 75%);

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__logo {
    height: 52px;
    width: 144px;
    &-container {
      display: flex;
      margin: 0 64px;
      cursor: pointer;
    }
  }
  &__menu {
    &-icon {
      display: none;
      font-size: 24px;
      cursor: pointer;
      margin-right: 16px;
    }
  }
  &__nav {
    margin: 0 64px;
    &-list {
      list-style: none;
      display: flex;
      gap: 16px;
      margin: 0;
      padding: 0;
    }

    &-link {
      color: $link-color;
      text-decoration: none;
      font-size: 16px;
      text-transform: lowercase;
      font-family: $font-family;

      &--active {
        font-weight: bold;
      }
    }
  }

  &__content {
    flex: 1;
    padding: 20px;
  }

  &__footer {
    background-color: $secondary-darken1;
    padding: 16px;
    text-align: center;
    font-size: 14px;
    color: $text-color-light;
  }
}

@media (max-width: 768px) {
  .layout {
    &__header {
      padding: 8px;
      &-content {
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
    &__logo {
      height: 32px;
      width: auto;
      max-width: 144px;
      &-container {
        margin: 0;
        margin-bottom: 8px;
      }
    }
    &__menu {
      &-icon {
        display: block;
      }
    }
    &__nav {
      display: none;
      margin: 0;
      width: 100%;
      &--open {
        display: block;
        max-height: 500px;
      }
      &-list {
        flex-direction: column;
        background-color: $background-color;
        padding: 0;
        margin: 0;
        gap: 0;
      }
      &-item {
        border-bottom: 1px solid lighten($text-color, 75%);
      }
      &-link {
        display: block;
        padding: 12px 16px;
        font-size: 18px;
      }
    }
  }
}
</style>
