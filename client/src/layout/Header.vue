<template>
  <div class="header-bar bg-primary d-inline-flex align-items-center mb-4">
    <template v-if="isMobile">
      <div class="d-inline-flex align-items-center">
        <button
          class="btn btn-info left-btn toggle-btn ml-2"
          @click.prevent="leftCollapsed = !leftCollapsed"
        >
          <font-awesome-icon
            :icon="leftCollapsed ? 'caret-down' : 'caret-up'"
            size="2x"
            class="text-dark"
          ></font-awesome-icon>
        </button>
        <router-link class="logo text-dark" to="/">
          {{ superSmall ? 'TD' : 'Team Donate' }}
        </router-link>
      </div>
      <div
        v-if="!leftCollapsed"
        class="
          left-side-menu
          bg-light
          d-flex
          flex-column
          align-items-start
          pt-3
        "
      >
        <router-link
          v-for="link in links"
          :key="link.name"
          class="header-link text-dark my-2"
          :to="link.to"
          @click.native="leftCollapsed = true"
        >
          {{ link.name }}
        </router-link>
      </div>
    </template>
    <template v-else>
      <router-link class="logo text-dark" to="/">Team Donate</router-link>
      <router-link
        v-for="link in links"
        :key="link.name"
        class="header-link text-dark"
        :to="link.to"
      >
        {{ link.name }}
      </router-link>
    </template>
    <div class="login ml-auto mr-2">
      <div v-if="profile && profile.name">
        <div class="d-inline-flex align-items-center">
          <div v-if="!superSmall" class="username text-dark mr-2">
            Hi, {{ profile.name }}
          </div>
          <button
            class="btn btn-info right-btn toggle-btn"
            @click.prevent="rightCollapsed = !rightCollapsed"
          >
            <font-awesome-icon
              :icon="rightCollapsed ? 'ellipsis-v' : 'ellipsis-h'"
              class="text-dark"
            ></font-awesome-icon>
          </button>
        </div>
        <template v-if="!rightCollapsed">
          <div
            class="
              right-side-menu
              bg-light
              d-flex
              flex-column
              align-items-end
              pt-3
            "
          >
            <router-link
              v-for="link in profileLinks"
              :key="link.name"
              class="profile-link text-dark my-2"
              :to="link.to"
              @click.native="rightCollapsed = true"
            >
              {{ link.name }}
            </router-link>
            <button
              class="btn btn-secondary align-self-center mt-5 w-100"
              @click.prevent="logoutClicked"
            >
              Log out
            </button>
          </div>
        </template>
      </div>
      <div v-else class="vld-parent loading-spinner">
        <div v-if="!profileDoneLoggingIn">
          &nbsp;
          <Loading :width="28" :height="28" bgColor="transparent" />
        </div>
        <router-link v-else class="btn btn-secondary right-btn" to="/login">
          Log in
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import googleService from '@/services/googleService';
import microsoftService from '@/services/microsoftService';
import Loading from '@/components/Loading';

export default {
  data() {
    return {
      leftCollapsed: true,
      rightCollapsed: true,
      isMobile: false,
      superSmall: false,
      links: [
        { name: 'Donate', to: { name: 'Donate' } },
        { name: 'Register', to: { name: 'Register' } },
        { name: 'Events', to: { name: 'Events' } },
        { name: 'Charities', to: { name: 'Charities' } },
        { name: 'About', to: { name: 'About' } },
      ],
      profileLinks: [
        { name: 'Home', to: { name: 'Profile Home' } },
        { name: 'Update Profile', to: { name: 'Update Profile' } },
      ],
    };
  },
  components: { Loading },
  methods: {
    ...mapActions(['logout', 'resetProfileLoggingIn']),
    onResize() {
      this.isMobile = window.innerWidth <= 960;
      this.superSmall = window.innerWidth <= 485;
    },
    logoutClicked() {
      this.logout();
      this.$success('Successfully logged out');
    },
  },
  computed: {
    ...mapGetters(['profile', 'profileDoneLoggingIn']),
  },
  async mounted() {
    // Only allow profile loading wheel to show for a second
    //   if already logged in and just refreshing
    setTimeout(this.resetProfileLoggingIn(), 1000);

    // Check if already logged into microsoft or google account
    microsoftService.selectAccount();
    let that = this;
    let checkGauthLoad = setInterval(function () {
      if (that.$gAuth.isInit) {
        googleService.initSdk(that.$gAuth);
        clearInterval(checkGauthLoad);
      }
    }, 1000);

    this.onResize();
    this.$nextTick(() => window.addEventListener('resize', this.onResize));
  },
};
</script>
<style lang="sass" scoped>
@import @/assets/styles/variables
.header-bar
  height: 60px
  width: 100%
  border-bottom: 6px solid $secondary
.logo
  font-family: 'Lobster', cursive
  font-weight: 600
  font-size: 40px
  padding-left: 10px
  padding-right: 20px
.header-link
  font-size: 20px
  padding-left: 14px
  padding-right: 14px
  text-shadow: 0px 1px $light
.router-link-active
  font-weight: bold
  text-shadow: 1px 1px $light
.profile-link
  font-size: 16px
.toggle-btn
  width: 40px !important
  height: 40px !important
  padding: 0
  display: flex
  align-items: center
  justify-content: center
.left-btn, .left-btn:hover, .right-btn, .right-btn:hover
  border: 2px solid $dark !important
.side-menu
  position: fixed
  z-index: 99
  padding-left: 20px
  padding-right: 20px
  padding-bottom: 20px
  width: 180px
  top: 54px
  border-bottom: 10px solid $primary
.left-side-menu
  @extend .side-menu
  left: 0px
  border-bottom-right-radius: 20px
  border-right: 2px solid $secondary
.right-side-menu
  @extend .side-menu
  right: 0px
  border-bottom-left-radius: 20px
  border-left: 2px solid $secondary
.loading-spinner
  min-width: 30px
  min-height: 30px
</style>
