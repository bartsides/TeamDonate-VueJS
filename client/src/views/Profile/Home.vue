<template>
  <div class="profile-home container">
    <div class="row">
      <h1 class="col-12 d-flex justify-content-center mb-5">Your Teams</h1>
      <TeamCard
        @click.native="teamClicked(team)"
        class="col-12"
        v-for="team in profile.teams" 
        :key="team.id" 
        :value="team"
      />
    </div>
    <router-link class="btn btn-primary" :to="{ name: 'Register' }">
      Register New Team
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TeamCard from '@/components/TeamCard';
export default {
  components: {
    TeamCard
  },
  computed: {
      ...mapGetters(['profile']),
  },
  methods: {
    teamClicked(team) {
      this.$router.push({ name: 'Team', params: { eventid: team.eventid, id: team.id } });
    }
  }
};
</script>
