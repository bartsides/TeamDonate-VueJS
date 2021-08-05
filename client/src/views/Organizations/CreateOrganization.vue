<template>
  <div class="create-organization">
    <h1 class="d-flex justify-content-center mb-4">Sign up</h1>
    <OrganizationDetails @submit="submit" buttonText="Register" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import OrganizationDetails from '@/components/OrganizationDetails';
export default {
  components: {
    OrganizationDetails,
  },
  computed: {
    ...mapGetters(['profile']),
  },
  methods: {
    ...mapActions(['createOrganization']),
    submit(organization) {
      const data = {
        ...organization,
        id: this.$newid(),
        admins: [{ id: this.profile.id, name: this.profile.name }],
      };
      this.createOrganization(data).then((res) => {
        console.log('res', res);
        if (res) {
          // TODO Redirect to organization page
          this.$toast.success('Charity registered!');
        } else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
  },
};
</script>
