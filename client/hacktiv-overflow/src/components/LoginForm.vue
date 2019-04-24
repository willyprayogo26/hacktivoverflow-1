<template>
  <v-container grid-list-md text-xs-center fill-height>
    <v-layout align-center justify-center row>
      <v-form fill-height ref="form" style="width: 400px;">
        <v-text-field v-model="inputEmail" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          v-model="inputPassword"
          :rules="passwordRules"
          label="Password"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
        ></v-text-field>

        <v-btn @click="login">Login</v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      show: false,
      emailRules: [v => !!v || 'Email is required'],
      passwordRules: [v => !!v || 'Password is required'],
    };
  },
  methods: {
    login() {
      const input = {
        email: this.inputEmail,
        password: this.inputPassword,
      };

      this.$store.dispatch('login', input);
    },
    cancel() {
      this.$refs.form.reset();
    },
  },
};
</script>
