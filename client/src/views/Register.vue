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
          <div class="col-12 mt-5">
            <Slider
              v-model="type"
              :options="['Join a team', 'Register a team']"
            />
          </div>
          <div class="col-12" v-if="type === 'Register a team'">
            <TextInput
              name="teamName"
              label="Team Name"
              v-model="teamName"
              rules="required"
            />
          </div>
          <div class="col-12" v-else>
            <Dropdown 
              name="team"
              label="Team"
              :options="teamsList"
              v-model="team"
              rules="required"
            />
          </div>
        </div>

        <button class="btn btn-primary btn-lg float-right mt-5">
          {{ type === 'Register a team' ? 'Register' : 'Join' }}
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
      event: null,
      organization: null,
      teamName: '',
      type: 'Join a team',
      team: null,
      teams: [],
    };
  },
  computed: {
    ...mapGetters(['organizations', 'events', 'profile']),    
    teamsList() {
      if (!this.teams) return [];
      if (!this.organization) return this.teams;
      return this.teams.filter(team => 
        team.organizationid == this.organization.id &&
        team.members && team.members.every(m => m.id != this.profile.id)
      );
    }
  },
  methods: {
    ...mapActions([
      'getEvents',
      'getOrganizations',
      'getTeams',
      'registerTeam',
      'joinTeam'
    ]),
    submit() {
      const user = { id: this.profile.id, name: this.profile.name };
      if (this.type === 'Register a team') {
        this.registerNewTeam(user);
      } else {
        this.registerToTeam(user);
      }
    },
    registerToTeam(user) {
      this.joinTeam({
        teamId: this.team.id,
        teamPk: this.team.eventid,
        user
      }).then((res) => {
        if (res) {
          // TODO redirect to team page
          this.$toast.success(`You've joined ${this.team.name}!`);
        }
        else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
    registerNewTeam(user) {
      // Register team
      const data = {
        id: this.$newid(),
        name: this.teamName,
        eventid: this.event.id,
        event: this.event.name,
        date: this.event.date,
        organizationid: this.organization.id,
        organization: this.organization.name,
        owner: user,
        members: [user],
      };

      this.registerTeam(data).then((res) => {
        if (res) {
          // TODO redirect to team page with invite
          this.$toast.success(
            `${this.teamName} is registered for ${this.event.name}!`
          );
        } else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
    getTeamsByEvent() {
      if (!this.event) {
        this.teams = [];
        return;
      }
      this.getTeams(this.event.id).then((res) => {
        this.teams = res;
      });
    },
  },
  mounted() {
    if (!this.events || !this.events.length) {
      this.getEvents().then(() => {
        if (this.events && this.events.length)
          this.event = this.events[0];        
      });
    }
    else {
      this.event = events[0];
    }

    if (!this.organizations || !this.organizations.length) {
      this.getOrganizations().then(() => {
        if (this.organizations && this.organizations.length)
          this.organization = this.organizations[0];
      });
    }
    else {
      this.organization = this.organizations[0];
    }
  },
  watch: {
    event: {
      deep: true,
      handler() {
        this.getTeamsByEvent();
      }
    }
  },
};
</script>
