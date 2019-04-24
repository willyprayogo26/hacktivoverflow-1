<template>
  <v-layout row>
    <v-flex xs12 sm9 offset-sm0>
      <v-card>
        <v-subheader>All Question by #{{this.$route.params.tagName}}</v-subheader>
        <div v-for="(question, index) in questions" :key="index">
          <div v-if="tagContains(question)">
            <v-divider light></v-divider>
            <v-layout align-center justify-start row fill-height>
              <v-flex xs2 class="text-xs-center">
                <v-btn small flat @click="votesQuestion('upvote', question._id)">
                  <v-icon medium>fas fa-sort-up</v-icon>
                </v-btn>
                <div class="text-xs-center">{{showVotes(index).status}}</div>
                <v-btn small flat @click="votesQuestion('downvote', question._id)">
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
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AllQuestion",
  data() {
    return {};
  },
  computed: {
    ...mapState(["questions"])
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
    tagContains(question) {
      return question.tags.indexOf(this.$route.params.tagName) > -1;
    }
  }
};
</script>