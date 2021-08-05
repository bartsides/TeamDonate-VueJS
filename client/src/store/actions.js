import auth from './auth/actions';
import events from './events/actions';
import organizations from './organizations/actions';
import profile from './profile/actions';
import teams from './teams/actions';

export default {
  ...auth,
  ...events,
  ...organizations,
  ...profile,
  ...teams,
};
