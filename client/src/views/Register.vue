<template>
  <ValidationObserver
    class="register-team container"
    slim
    v-slot="{ handleSubmit }"
  >
    <!-- TODO Link to register charity -->
    <div class="row">
      <h1 class="col-12 d-flex justify-content-center mb-4">
        Register to raise money for a worthy cause!
      </h1>
    </div>
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
            v-model="data.event"
            rules="required"
          />
          <Dropdown
            name="organization"
            label="Charity"
            class="col-12"
            :options="organizations"
            v-model="data.organization"
            rules="required"
          />
          <div class="col-12 mt-5">
            <Slider
              v-model="type"
              :options="['Walk with an existing team', 'Register a team']"
            />
          </div>
          <div class="col-12" v-if="type === 'Register a team'">
            <TextInput
              name="name"
              label="Team Name"
              v-model="data.name"
              rules="required"
            />
          </div>
        </div>

        <button class="btn btn-primary btn-lg float-right mt-5">
          Register
        </button>
      </form>
    </div>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import Dropdown from '@/components/Dropdown';
import TextInput from '@/components/TextInput';
import Slider from '@/components/Slider';
export default {
  components: { ValidationObserver, Dropdown, TextInput, Slider },
  data() {
    return {
      data: {},
      type: 'Walk with an existing team',
      teams: [],
    };
  },
  computed: {
    ...mapGetters(['organizations', 'events', 'profile']),
  },
  methods: {
    ...mapActions([
      'getEvents',
      'getOrganizations',
      'getTeams',
      'registerTeam',
    ]),
    submit() {
      const user = { id: this.profile.id, name: this.profile.name };
      if (this.type === 'Team') {
        // Register team
        const data = {
          ...this.data,
          id: this.$newid(),
          eventid: this.data.event.id,
          event: this.data.event.name,
          date: this.data.event.date,
          organizationid: this.data.organization.id,
          organization: this.data.organization.name,
          owner: user,
          members: [user],
        };

        this.registerTeam(data).then((res) => {
          if (res) {
            // TODO redirect to team page with invite
            this.$toast.success(
              `${this.data.name} is registered for ${this.data.event.name}!`
            );
          } else {
            this.$toast.error('An error occurred. Try again in a bit.');
          }
        });
      } else {
        // Register walker to team
      }
    },
    getTeamsByEvent() {
      if (!this.data || !this.data.event) {
        this.teams = [];
        return;
      }
      this.getTeams(this.data.event.id).then((res) => {
        this.teams = res;
      });
    },
  },
  mounted() {
    if (!this.event || !this.events.length) this.getEvents();
    if (!this.organizations || !this.organizations.length)
      this.getOrganizations();
  },
  watch: {
    data: {
      deep: true,
      handler(val, oldVal) {
        console.log('log', val, oldVal);
        // TODO enhance this
        // Get teams if event changed
        if (
          val &&
          val.event &&
          (!oldVal || !oldVal.event || val.event.id !== oldVal.event.id)
        ) {
          this.getTeamsByEvent();
        }
      },
    },
  },
};
</script>
