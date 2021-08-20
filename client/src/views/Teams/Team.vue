<template>
    <div class="team">
        <div v-if="team">
            {{ team.name }}
            
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            team: null
        };
    },
    computed: {
        ...mapGetters(['profile'])
    },
    methods: {
        ...mapActions(['getTeam'])
    },
    mounted() {
        const eventid = this.$route.params['eventid'];
        const id = this.$route.params['id'];
        this.getTeam({ eventid: eventid, teamid: id}).then(res => team = res);
    }
}
</script>