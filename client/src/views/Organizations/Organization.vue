<template>
  <div class="organization h-100">
    <div
      class="organization-admin-bar h-100 d-flex flex-row-reverse mr-3"
      v-if="organizationAdmin"
    >
      <button class="btn btn-primary" @click.prevent="editing = !editing">
        {{ editing ? 'Cancel' : 'Manage' }}
      </button>
    </div>

    <div class="update-organization" v-if="editing">
      <h1 class="d-flex justify-content-center mb-4">
        Update organization details
      </h1>
      <OrganizationDetails
        :value="organization"
        @submit="submit"
        buttonText="Update Organization"
      />
    </div>
    <div class="vld-parent h-100 w-100" v-else>
      <div class="organization-page container" v-if="organization">
        <!-- TODO donate link -->
        <h1 class="d-flex justify-content-center">{{ organization.name }}</h1>
        <TextViewer
          v-if="organization && organization.description"
          :value="organization.description"
        />
      </div>
      <div class="h-100 w-100" v-else>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Loading />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';
import Loading from '@/components/Loading';
import OrganizationDetails from '@/components/OrganizationDetails';
import TextViewer from '@/components/TextViewer';
export default {
  components: {
    Loading,
    OrganizationDetails,
    TextViewer,
  },
  data() {
    return {
      organization: null,
      editing: false,
    };
  },
  computed: {
    ...mapGetters(['isAdmin', 'organizations', 'profile']),
    organizationAdmin() {
      return (
        this.isAdmin ||
        (this.profile &&
          this.organization &&
          this.organization.admins &&
          this.organization.admins.find((a) => a.id == this.profile.id))
      );
    },
  },
  methods: {
    ...mapActions(['updateOrganization', 'getOrganization']),
    submit(organizationData) {
      if (!this.isAdmin) router.push('/');
      const data = {
        id: this.$newid(),
        ...organizationData,
      };

      this.updateOrganization(data).then((res) => {
        if (res) {
          this.editing = false;
          this.$toast.success('Organization updated successfully!');
        } else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
  },
  async mounted() {
    const organizationId = this.$route.params['id'];
    // Get data from store if possible
    if (this.organizations && this.organizations.length)
      this.organization = this.organizations.find(
        (organization) => organization.id == organizationId
      );
    else this.organization = await this.getOrganization(organizationId);
  },
};
</script>
