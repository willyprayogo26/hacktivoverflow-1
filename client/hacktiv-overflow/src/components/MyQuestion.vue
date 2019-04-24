<template>
  <v-layout row>
    <v-flex xs12 sm9 offset-sm0>
      <v-card>
        <v-subheader>My Question</v-subheader>
        <div v-for="(question, index) in questions" :key="index">
          <div v-if="question.userId._id === userId">
            <v-divider light></v-divider>
            <v-layout align-center justify-start row fill-height>
              <v-flex xs2 class="text-xs-center">
                <v-btn small flat @click="votes('upvote', question._id)">
                  <v-icon medium>fas fa-sort-up</v-icon>
                </v-btn>
                <div class="text-xs-center">{{showVotes(index).status}}</div>
                <v-btn small flat @click="votes('downvote', question._id)">
                  <v-icon medium>fas fa-sort-down</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs10>
                <v-card-title primary-title>
                  <div>
                    <router-link
                      :to="{ name: 'questiondetails', params: { questionId: question._id } }"
                      style="text-decoration: none; color: black;"
                      class="headline"
                    >{{ question.title }}</router-link>
                    <span v-html="question.description"></span>
                    <v-btn
                      depressed
                      round
                      small
                      v-for="(tag, index) in question.tags"
                      :key="index"
                      color="secondary"
                      :to="{ name: 'questionTag', params: { tagName: tag } }"
                    >{{ tag }}</v-btn>
                    <br>
                    <br>
                    <span class="grey--text">Asked by: {{ question.userId.email }}</span>
                    <span>
                      <v-btn flat small @click="showModalEdit(question)">Edit</v-btn>
                      <v-btn flat small @click="deleteQuestion(question._id)">Delete</v-btn>
                    </span>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Question</span>
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
              <v-flex xs11>
                <tags-input element-id="tags" v-model="newTags" :typeahead="true"></tags-input>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="updateQuestion">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VoerroTagsInput from "@voerro/vue-tagsinput";

export default {
  name: "MyQuestion",
  components: {
    "tags-input": VoerroTagsInput
  },
  data() {
    return {
      dialog: false,
      userId: localStorage.getItem("id"),
      dialog: false,
      newTitle: "",
      newTags: [],
      editor: ClassicEditor,
      newDescription: "",
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      questionId: ""
    };
  },
  computed: {
    ...mapState(["questions"])
  },
  created() {
    this.getAllQuestion();
  },
  methods: {
    ...mapActions(["getAllQuestion"]),
    votes(vote, questionId) {
      this.$store.dispatch("votes", [vote, questionId]);
    },
    showVotes(index) {
      if (this.questions[index].votes.length) {
        return this.questions[index].votes.reduce((a, b) => ({
          status: a.status + b.status
        }));
      }
      return { status: 0 };
    },
    showModalEdit(question) {
      this.questionId = question._id;
      this.newTitle = question.title;
      this.newDescription = question.description;
      this.newTags = question.tags;
      this.dialog = true;
    },
    updateQuestion() {
      const input = {
        title: this.newTitle,
        description: this.newDescription,
        tags: this.newTags
      };

      this.$store.dispatch("updateQuestion", [this.questionId, input]);
      // this.$store.dispatch("getAllQuestion");
      this.dialog = false;
    },
    deleteQuestion(questionId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteQuestion", questionId);
          // this.$store.dispatch("getAllQuestion");
        }
      });
    }
  }
};
</script>

<style>
</style>
