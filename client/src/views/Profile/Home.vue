<template>
  <div class="profile-home">
    <h1>Teams</h1>
    <!-- <div v-for="team in profile.teams" :key="team.id">
      {{ team.name }}
    </div> -->
    <router-link class="btn btn-primary" :to="{ name: 'Register' }">
      Register Team
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      ...mapGetters(['profile']),
    };
  },
};
</script>
