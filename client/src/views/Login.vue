<template>
  <div class="login container">
    <h1 class="d-flex justify-content-center mb-4">Log in / register</h1>
    <div
      class="login-buttons w-100 d-inline-flex flex-column align-items-center"
    >
      <button
        class="
          login-button
          btn btn-primary
          my-2
          d-inline-flex
          align-items-center
        "
        @click="loginGoogle"
      >
        <font-awesome-icon
          class="float-left"
          :icon="['fab', 'google']"
        ></font-awesome-icon>
        <div class="ml-3">Google</div>
      </button>
      <button
        class="
          login-button
          btn btn-primary
          my-2
          d-inline-flex
          align-items-center
        "
        @click="loginFacebook"
      >
        <font-awesome-icon
          class="float-left"
          :icon="['fab', 'facebook']"
        ></font-awesome-icon>
        <div class="ml-3">Facebook</div>
      </button>
      <button
        class="
          login-button
          btn btn-primary
          my-2
          d-inline-flex
          align-items-center
        "
        @click="loginMicrosoft"
      >
        <font-awesome-icon
          class="float-left"
          :icon="['fab', 'microsoft']"
        ></font-awesome-icon>
        <div class="ml-3">Microsoft</div>
      </button>
      <button
        class="
          login-button
          btn btn-primary
          my-2
          d-inline-flex
          align-items-center
        "
        @click="loginMicrosoft"
      >
        <font-awesome-icon
          class="float-left"
          icon="envelope-open"
        ></font-awesome-icon>
        <div class="ml-3">Email</div>
      </button>
    </div>
    <div
      class="register-email-instructions mt-5 w-100 d-flex flex-column"
      style="text-align: center"
    >
      <h2>Registering with email?</h2>
      <div>
        After clicking the Email button, click where it says No account?
        <u>Create one!</u> to register.
      </div>
    </div>
  </div>
</template>
<script>
import facebookService from '@/services/facebookService';
import googleService from '@/services/googleService';
import microsoftService from '@/services/microsoftService';
export default {
  methods: {
    loginFacebook: facebookService.login,
    loginMicrosoft: microsoftService.login,
    loginGoogle: googleService.login,
  },
};
</script>
<style lang="sass" scoped>
.login-button
  font-size: 28px
  width: 190px
</style>
