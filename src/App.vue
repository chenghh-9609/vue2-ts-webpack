<template>
  <div>
    <div class="menu">
      <div class="tabs">
        <router-link
          v-for="item in menu"
          :key="item.to"
          :to="item.to"
          class="tabs-item"
          :class="{ selected: item.to === selected }"
          >{{ item.title }}</router-link
        >
      </div>
      <div class="profile">
        <router-link class="profile-register" to="/register"
          >Sign Up</router-link
        >
        <router-link class="profile-login" to="/login">Sign In</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      menu: [
        {
          to: '/',
          title: 'Home',
        },
        {
          to: '/about',
          title: 'About',
        },
        {
          to: '/worker',
          title: 'Web Worker',
        },
        {
          to: '/serviceworker',
          title: 'Service Worker',
        },
      ],
      selected: '',
    };
  },
  watch: {
    $route() {
      console.log(this.$route.path);

      this.selected = this.$route.path;
    },
  },
};
</script>

<style lang="scss">
html {
  --color-primary: #f8c301;
  --color-white: #fff;
  --color-black: #000;
  --color-light: #eee;
  --color-grey: rgb(104, 104, 104);
}
@mixin button_style {
  color: var(--color-white);
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 0.3rem;
}
.menu {
  display: flex;
  justify-content: space-between;
  padding: 0 .5rem;
}
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  .profile-register {
    @include button_style;
    background-color: var(--color-primary);
    margin-right: .5rem;
  }
  .profile-login {
    @include button_style();
    background-color: var(--color-grey);
  }
}
.tabs {
  display: flex;
  justify-content: flex-start;
}
.tabs-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
  color: var(--color-white);
  text-decoration: none;
  &::after {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    left: 100%;
    bottom: 0;
    transition: all 0.4s;
    background-color: var(--color-primary);
  }
  &:hover {
    color: var(--color-primary);
    &::after {
      width: 100%;
      left: 0;
      transition-delay: 0.1s;
    }
    & ~ a::after {
      left: 0;
    }
  }

  &.selected {
    color: var(--color-primary);
    &::after {
      width: 100%;
      left: 0;
    }
  }
}
</style>
