<template>
  <v-layout row>
    <v-flex xs12 sm9 offset-sm0>
      <v-card>
        <v-subheader class="font-weight-bold display-1">{{ questionDetails.title }}</v-subheader>
        <v-subheader class="font-weight-light">Asked by: {{ questionDetails.userId.email }}</v-subheader>
        <v-layout align-center justify-start row fill-height>
          <v-flex xs2 class="text-xs-center">
            <v-btn small flat @click="votesQuestion('upvote', questionDetails._id)">
              <v-icon medium>fas fa-sort-up</v-icon>
            </v-btn>
            <div class="text-xs-center">{{showVotesQuestion().status}}</div>
            <v-btn small flat @click="votesQuestion('downvote', questionDetails._id)">
              <v-icon medium>fas fa-sort-down</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <span v-html="questionDetails.description"></span>
                <v-btn
                  depressed
                  round
                  small
                  v-for="(tag, index) in questionDetails.tags"
                  :key="index"
                  color="secondary"
                  :to="{ name: 'questionTag', params: { tagName: tag } }"
                >{{ tag }}</v-btn>
                <br>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card class="mt-3">
        <v-subheader class="font-weight-bold display-1">All Answer</v-subheader>
        <div v-for="(answer, index) in questionDetails.answers" :key="index">
          <v-divider light></v-divider>
          <v-layout align-center justify-start row fill-height>
            <v-flex xs2 class="text-xs-center">
              <v-btn small flat @click="votesAnswer('upvote', answer._id)">
                <v-icon medium>fas fa-sort-up</v-icon>
              </v-btn>
              <div class="text-xs-center">{{showVotes(index).status}}</div>
              <v-btn small flat @click="votesAnswer('downvote', answer._id)">
                <v-icon medium>fas fa-sort-down</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs10>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ answer.title }}</div>
                  <span v-html="answer.description"></span>
                  <span class="grey--text">Answer by: {{ answer.userId.email }}</span>
                  <span v-if="answer.userId._id === userId">
                    <v-btn flat small @click="showModalEdit(answer)">Edit</v-btn>
                    <v-btn flat small @click="deleteAnswer(answer._id)">Delete</v-btn>
                  </span>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </div>
        <v-divider light></v-divider>
        <v-subheader class="font-weight-bold display-1 mt-5">Your Answer</v-subheader>
        <v-layout align-space-around justify-center column fill-height class="mx-3">
          <v-flex xs12>
            <v-text-field
              label="Title"
              type="text"
              class="text-xs-center"
              v-model="inputTitle"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <ckeditor :editor="editor" v-model="inputDescription" :config="editorConfig"></ckeditor>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="addAnswer(questionDetails._id)">Add</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Answer</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Title"
                  type="text"
                  class="text-xs-center"
                  v-model="newTitle"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs11>
                <ckeditor :editor="editor" v-model="newDescription" :config="editorConfig"></ckeditor>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="updateAnswer">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'QuestionDetails',
  data() {
    return {
      dialog: false,
      userId: localStorage.getItem('id'),
      inputTitle: '',
      editor: ClassicEditor,
      inputDescription: '',
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      newTitle: '',
      newDescription: '',
      answerId: '',
    };
  },
  computed: {
    ...mapState(['questionDetails']),
  },
  created() {
    this.$store.dispatch('getQuestionDetails', this.$route.params.questionId);
  },
  methods: {
    votesQuestion(vote, questionId) {
      this.$store.dispatch('votesQuestion', [vote, questionId]);
    },
    votesAnswer(vote, answerId) {
      this.$store.dispatch('votesAnswer', [
        vote,
        answerId,
        this.$route.params.questionId,
      ]);
    },
    showVotesQuestion() {
      if (this.questionDetails.votes.length) {
        return this.questionDetails.votes.reduce((a, b) => ({
          status: a.status + b.status,
        }));
      }
      return { status: 0 };
    },
    showVotes(index) {
      if (this.questionDetails.answers[index].votes.length) {
        return this.questionDetails.answers[index].votes.reduce((a, b) => ({
          status: a.status + b.status,
        }));
      }
      return { status: 0 };
    },
    clear() {
      this.inputTitle = '';
      this.inputDescription = '';
    },
    addAnswer(questionId) {
      const input = {
        title: this.inputTitle,
        description: this.inputDescription,
        questionId,
      };

      this.$store.dispatch('addAnswer', input);
      this.clear();
      this.$store.dispatch('getQuestionDetails', this.$route.params.questionId);
    },
    showModalEdit(answer) {
      this.answerId = answer._id;
      this.newTitle = answer.title;
      this.newDescription = answer.description;
      this.dialog = true;
    },
    updateAnswer() {
      const input = {
        title: this.newTitle,
        description: this.newDescription,
      };

      this.$store.dispatch('updateAnswer', [
        this.answerId,
        input,
        this.$route.params.questionId,
      ]);
      this.dialog = false;
    },
    deleteAnswer(answerId) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteAnswer', [
            answerId,
            this.$route.params.questionId,
          ]);
        }
      });
    },
  },
};
</script>

<style>
</style>
