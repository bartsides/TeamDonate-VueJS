<template>
  <div class="events">
    <div class="events-admin d-flex flex-row-reverse" v-if="isAdmin">
      <router-link class="btn btn-primary mr-4" :to="{ name: 'Create Event' }">
        Create Event
      </router-link>
    </div>
    <div class="event-cards container">
      <div class="row">
        <h1 class="col-12 d-flex justify-content-center mb-5">
          Upcoming Events
        </h1>
        <div
          v-if="!events || !events.length"
          class="col-12 d-flex justify-content-center"
        >
          <h3>No events coming up but check back for more!</h3>
        </div>
        <EventCard
          @click.native="eventClicked(event)"
          class="col-12 mb-5"
          v-for="event in events"
          :key="event.id"
          :value="event"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import EventCard from '../../components/EventCard.vue';
export default {
  components: { EventCard },
  methods: {
    ...mapActions(['getEvents']),
    eventClicked(item) {
      this.$router.push({ name: 'Event', params: { id: item.id } });
    },
  },
  computed: {
    ...mapGetters(['events', 'isAdmin']),
  },
  mounted() {
    if (!this.events || !this.events.length) this.getEvents();
  },
};
</script>
