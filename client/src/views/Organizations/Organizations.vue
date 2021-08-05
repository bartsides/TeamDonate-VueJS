<template>
  <div class="organizations">
    <div class="d-flex flex-row-reverse">
      <router-link
        class="btn btn-primary mr-4"
        :to="{ name: 'Register Charity' }"
      >
        Register Charity
      </router-link>
    </div>
    <div class="organization-cards container">
      <div class="row">
        <h1 class="col-12 d-flex justify-content-center mb-5">Charities</h1>
        <OrganizationCard
          @click.native="organizationClicked(org)"
          class="col-3"
          v-for="org in organizations"
          :key="org.id"
          :value="org"
        />
      </div>
    </div>
  </div>
</template>
<script>
import OrganizationCard from '@/components/OrganizationCard';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { OrganizationCard },
  computed: {
    ...mapGetters(['organizations']),
  },
  methods: {
    ...mapActions(['getOrganizations']),
    organizationClicked(item) {
      this.$router.push({ name: 'Charity', params: { id: item.id } });
    },
  },
  mounted() {
    if (!this.organizations || !this.organizations.length)
      this.getOrganizations();
  },
};
</script>
