import eventService from '@/services/eventService';
import store from '@/store';
export default {
  getEvent({ commit }, id) {
    return eventService
      .getEvent(id)
      .then((res) => (res && res.data ? res.data : null));
  },
  getEvents({ commit }) {
    return eventService.getEvents().then((res) => {
      commit('storeEvents', res && res.data ? res.data : []);
    });
  },
  createEvent({ commit }, event) {
    return eventService.createEvent(event).then((res) => {
      if (!res || !res.status) return false;
      if (store.getters.events?.length) store.getters.events.push(event);
      return true;
    });
  },
  updateEvent({ commit }, event) {
    return eventService
      .updateEvent(event)
      .then((res) => res && res.status == 200);
  },
};
