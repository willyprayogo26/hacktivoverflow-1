<template>
  <v-layout row wrap>
    <v-flex xs9>
      <v-card>
        <v-subheader>All Question</v-subheader>
        <div v-for="(question, index) in questions" :key="index">
          <v-divider light></v-divider>
          <v-layout align-center justify-start row fill-height>
            <v-flex xs2 class="text-xs-center" v-if="isLogin">
              <v-btn small flat @click="votesQuestion('upvote', question._id)">
                <v-icon medium>fas fa-sort-up</v-icon>
              </v-btn>
              <div class="text-xs-center">{{showVotes(index).status}}</div>
              <v-btn small flat @click="votesQuestion('downvote', question._id)">
                <v-icon medium>fas fa-sort-down</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs2 class="text-xs-center" v-if="!isLogin">
              <v-btn small flat @click="votesQuestion('upvote', question._id)" disabled>
                <v-icon medium>fas fa-sort-up</v-icon>
              </v-btn>
              <div class="text-xs-center">{{showVotes(index).status}}</div>
              <v-btn small flat @click="votesQuestion('downvote', question._id)" disabled>
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
                  <span class="grey--text">Asked by: {{ question.userId.email }}</span>
                  <br>
                  <span
                    v-if="question.answers.length < 2"
                    class="grey--text"
                  >{{ question.answers.length }} answer</span>
                  <span v-else class="grey--text">{{ question.answers.length }} answers</span>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-flex>
    <v-flex class="text-xs-center" v-if="isLogin">
      <v-card>
        <v-subheader>
          Watched Tag
          <v-btn flat small class="caption" @click="edit = !edit">edit</v-btn>
        </v-subheader>
        <v-divider light></v-divider>
        <div v-if="!edit">
          <span v-for="(tag, index) in watchedTags" :key="index">
            <v-btn
              depressed
              round
              small
              color="secondary"
              :to="{ name: 'questionTag', params: { tagName: tag } }"
            >{{ tag }}</v-btn>
            <br>
          </span>
        </div>
        <div v-if="edit">
          <span v-for="(tag, index) in watchedTags" :key="index">
            <v-btn depressed round small color="secondary" @click="deleteTag(tag)">
              <v-icon>fas fa-times</v-icon>
              {{ tag }}
            </v-btn>
            <br>
          </span>
        </div>
        <br>
        <v-btn outline color="indigo" v-if="!show" @click="showAddTag">Watch a tag</v-btn>
        <form @submit.prevent="addTag">
          <v-text-field label="Tag Name" class="mx-3" v-model="inputTag" v-if="show"></v-text-field>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AllQuestion",
  data() {
    return {
      show: false,
      edit: false,
      inputTag: ""
    };
  },
  computed: {
    ...mapState(["questions", "watchedTags", "isLogin"])
  },
  created() {
    this.getAllQuestion();
  },
  methods: {
    ...mapActions(["getAllQuestion"]),
    votesQuestion(vote, questionId) {
      this.$store.dispatch("votesQuestion", [vote, questionId]);
    },
    showVotes(index) {
      if (this.questions[index].votes.length) {
        return this.questions[index].votes.reduce((a, b) => ({
          status: a.status + b.status
        }));
      }
      return { status: 0 };
    },
    showAddTag() {
      this.show = true;
    },
    addTag() {
      const input = {
        watchTags: this.inputTag
      };

      this.$store.dispatch("addTag", input);
      this.inputTag = "";
      this.show = false;
    },
    deleteTag(tagName) {
      const input = {
        watchTags: tagName
      };

      this.$store.dispatch("deleteTag", input);
    }
  }
};
</script>

<style>
</style>
