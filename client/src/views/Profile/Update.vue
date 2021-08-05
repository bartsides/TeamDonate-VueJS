<template>
  <div class="profile-update d-flex justify-content-center pb-5">
    <ValidationObserver class="container" slim v-slot="{ handleSubmit }">
      <div class="row d-flex justify-content-center">
        <h1 class="col-12 d-flex justify-content-center mb-4">
          Update your profile
        </h1>
        <form
          @submit.prevent="handleSubmit(save)"
          class="col-12 col-md-10 col-lg-8"
        >
          <div class="row">
            <TextInput
              name="name"
              type="text"
              label="Full name"
              class="col-12"
              v-model="data.name"
              rules="required"
            />
            <TextInput
              name="address1"
              type="text"
              label="Address 1"
              class="col-12"
              v-model="data.address1"
              rules="required"
            />
            <TextInput
              name="address2"
              type="text"
              label="Address 2"
              class="col-12"
              v-model="data.address2"
            />
            <TextInput
              name="city"
              type="text"
              label="City"
              class="col-12"
              v-model="data.city"
              rules="required"
            />
            <TextInput
              name="state"
              type="text"
              label="State"
              class="col-12 col-md-6"
              v-model="data.state"
              rules="required"
            />
            <TextInput
              name="zip"
              type="text"
              label="Zip"
              class="col-12 col-md-6"
              mask="#####"
              v-model="data.zip"
              rules="required"
            />
            <TextInput
              name="phone"
              type="text"
              label="Phone number"
              class="col-12"
              :mask="['(###) ###-####', '# (###) ###-####']"
              v-model="data.phone"
              rules="required"
            />
            <TextInput
              name="email"
              type="text"
              label="Email"
              class="col-12"
              v-model="data.email"
              rules="required"
            />
          </div>

          <button class="btn btn-primary btn-lg float-right">Save</button>
        </form>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate';
import TextInput from '@/components/TextInput';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { ValidationObserver, TextInput },
  computed: {
    ...mapGetters(['profile']),
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    ...mapActions(['updateProfile']),
    save() {
      this.updateProfile(this.data).then((res) => {
        if (res) {
          this.$toast.success('Profile updated successfully!');
          // TODO redirect after profile updated - register? show teams if any? create profile landing page?
        } else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
  },
  watch: {
    profile: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.data = JSON.parse(JSON.stringify(val));
        }
      },
    },
  },
};
</script>
