<template>
  <ValidationObserver class="donate container" slim v-slot="{ handleSubmit }">
    <h1 class="col-12 d-flex justify-content-center mb-4">Make a donation</h1>
    <div class="row justify-content-center">
      <form
        @submit.prevent="handleSubmit(submit)"
        class="col-12 col-md-10 col-lg-8"
      >
        <div class="row">
          <Dropdown
            name="event"
            label="Event"
            class="col-12"
            :options="events"
            v-model="event"
            rules="required"
          />
          <Dropdown
            name="organization"
            label="Charity"
            class="col-12"
            :options="organizations"
            v-model="organization"
            rules="required"
          />
          <Dropdown
            name="team"
            label="Charity"
            class="col-12"
            :options="teams"
            v-model="team"
            rules="required"
          />
          <TextInput
            name="amount"
            label="Amount"
            type="money"
            class="col-6"
            v-model="amount"
            rules="required"
          />
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import Dropdown from '@/components/Dropdown';
import TextInput from '@/components/TextInput';

export default {
  components: { ValidationObserver, Dropdown, TextInput },
  data() {
    return {
      event: null,
      organization: null,
      team: null,
      amount: '',
    };
  },
  computed: {
    ...mapGetters(['events', 'organizations', 'teams']),
  },
  methods: {
    ...mapActions(['getEvents', 'getOrganizations', 'getTeams']),
  },
  mounted() {
    if (!this.organizations || !this.organizations.length)
      this.getOrganizations();
    if (!this.events || !this.events.length) this.getEvents();
    if (!this.teams || !this.teams.length) this.getTeams();
  },
};
</script>
