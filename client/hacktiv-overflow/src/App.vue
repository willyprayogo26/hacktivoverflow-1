<template>
  <v-app>
    <navbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    if (localStorage.getItem('token')) {
      this.changeIsLogin();
    }
  },
  methods: {
    ...mapMutations(['changeIsLogin']),
  },
};
</script>
