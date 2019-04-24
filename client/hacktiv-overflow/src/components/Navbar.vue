<template>
  <v-toolbar app>
    <v-btn flat to="/" class="headline text-uppercase">
      <span>𝓗𝓪𝓬𝓴𝓽𝓲𝓿-𝓞𝓿𝓮𝓻𝓯𝓵𝓸𝔀</span>
    </v-btn>
    <v-btn to="/my-questions" flat v-if="isLogin">
      <span>My Questions</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Add Question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" type="text" class="text-xs-center" v-model="inputTitle" required></v-text-field>
              </v-flex>
              <v-flex xs11>
                <ckeditor :editor="editor" v-model="inputDescription" :config="editorConfig"></ckeditor>
              </v-flex>
              <v-flex xs11>
                <tags-input
                  element-id="tags"
                  v-model="inputTags"
                  :typeahead="true"
                ></tags-input>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addQuestion">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn to="/register" flat v-if="!isLogin">Register</v-btn>
    <v-btn to="/login" flat v-if="!isLogin">Login</v-btn>
    <v-btn flat v-if="isLogin" @click="dialog = true">Add Question</v-btn>
    <v-btn to="/logout" flat v-if="isLogin" @click="logout">Logout</v-btn>
  </v-toolbar>
</template>

<script>
import Swal from 'sweetalert2';
import { mapState, mapMutations, mapActions } from 'vuex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import VoerroTagsInput from '@voerro/vue-tagsinput';
import axios from '../api/axios';

export default {
  name: 'navbar',
  components: {
    'tags-input': VoerroTagsInput,
  },
  data() {
    return {
      dialog: false,
      inputTitle: '',
      inputTags: [],
      editor: ClassicEditor,
      inputDescription: '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
    };
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
      this.changeIsLogin();
    },
    close() {
      this.inputTitle = '';
      this.inputDescription = '';
      this.inputTags = [];
      this.dialog = false;
    },
    addQuestion() {
      const input = {
        title: this.inputTitle,
        description: this.inputDescription,
        tags: this.inputTags,
      };

      this.$store.dispatch('addQuestion', input);
      this.close();
    },


    ...mapMutations(['changeIsLogin']),
  },
};
</script>
