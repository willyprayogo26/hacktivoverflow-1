import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import Swal from 'sweetalert2';
import axios from '@/api/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    questionDetails: {},
    watchedTags: [],
  },
  mutations: {
    changeIsLogin(state) {
      state.isLogin = !state.isLogin;
    },
    setAllQuestion(state, data) {
      state.questions = data;
    },
    setQuestionDetails(state, data) {
      state.questionDetails = data;
    },
    setWatchedTags(state, data) {
      state.watchedTags = data;
    },
  },
  actions: {
    register({ commit }, input) {
      axios({
        method: 'POST',
        url: '/register',
        data: input,
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Successfully register',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    login({ commit }, input) {
      axios({
        method: 'POST',
        url: '/login',
        data: input,
      })
        .then(({ data }) => {
          localStorage.setItem('id', data.id);
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('role', data.role);
          localStorage.setItem('token', data.token);
          router.push('/');
          commit('changeIsLogin');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    addQuestion({ commit, state, dispatch }, input) {
      axios({
        method: 'POST',
        url: `/questions/${localStorage.getItem('id')}`,
        data: input,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Successfully add question',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch('getAllQuestion');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    updateQuestion({ commit, dispatch }, input) {
      axios({
        method: 'PUT',
        url: `/questions/${localStorage.getItem('id')}/${input[0]}`,
        data: input[1],
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Successfully update question',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch('getAllQuestion');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    deleteQuestion({ commit, dispatch }, questionId) {
      axios({
        method: 'DELETE',
        url: `/questions/${localStorage.getItem('id')}/${questionId}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.fire('Deleted!', 'Your question has been deleted.', 'success');
          dispatch('getAllQuestion');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    addAnswer({ commit, state, dispatch }, input) {
      axios({
        method: 'POST',
        url: `/answers/${localStorage.getItem('id')}/${input.questionId}`,
        data: input,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Successfully add answer',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch('getQuestionDetails', input.questionId);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    updateAnswer({ commit, dispatch }, input) {
      axios({
        method: 'PUT',
        url: `/answers/${localStorage.getItem('id')}/${input[0]}`,
        data: input[1],
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Successfully update answer',
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch('getQuestionDetails', input[2]);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    deleteAnswer({ commit, dispatch }, input) {
      axios({
        method: 'DELETE',
        url: `/answers/${localStorage.getItem('id')}/${input[0]}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          Swal.fire('Deleted!', 'Your answer has been deleted.', 'success');
          dispatch('getQuestionDetails', input[1]);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    getAllQuestion({ commit, dispatch }) {
      axios({
        method: 'GET',
        url: '/questions',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('setAllQuestion', data);
          if (localStorage.getItem('id')) {
            dispatch('getUserInfo');
          }
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    getQuestionDetails({ commit }, param) {
      axios({
        method: 'GET',
        url: `/questions/${param}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('setQuestionDetails', data);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    votesQuestion({ commit, dispatch }, input) {
      const vote = {
        status: input[0],
      };
      axios({
        method: 'PATCH',
        url: `/questions/${localStorage.getItem('id')}/votes/${input[1]}`,
        data: vote,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          dispatch('getAllQuestion');
          dispatch('getQuestionDetails', input[1]);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated tada',
            },
          });
        });
    },
    votesAnswer({ commit, dispatch }, input) {
      const vote = {
        status: input[0],
      };
      axios({
        method: 'PATCH',
        url: `/answers/${localStorage.getItem('id')}/votes/${input[1]}`,
        data: vote,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          dispatch('getQuestionDetails', input[2]);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated tada',
            },
          });
        });
    },
    getUserInfo({ commit, dispatch }) {
      axios({
        method: 'GET',
        url: `/users/${localStorage.getItem('id')}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('setWatchedTags', data.watchTags);
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    },
    addTag({ commit, dispatch }, input) {
      axios({
        method: 'PATCH',
        url: `/users/add/${localStorage.getItem('id')}`,
        data: input,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          dispatch('getUserInfo');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated tada',
            },
          });
        });
    },
    deleteTag({ commit, dispatch }, input) {
      axios({
        method: 'PATCH',
        url: `/users/delete/${localStorage.getItem('id')}`,
        data: input,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          dispatch('getUserInfo');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated tada',
            },
          });
        });
    },
  },
});
