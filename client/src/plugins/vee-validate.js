import { extend } from 'vee-validate';
import { required, email, numeric } from 'vee-validate/dist/rules';

extend('email', email);

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('positive', {
  ...numeric,
  message: 'Please enter a positive value',
  validate: (value) => value > 0,
});
