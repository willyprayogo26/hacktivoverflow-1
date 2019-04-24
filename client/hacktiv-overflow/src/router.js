import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyQuestion from './views/MyQuestion.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/my-questions',
      name: 'myquestion',
      component: MyQuestion,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './components/RegisForm.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/LoginForm.vue'),
    },
    {
      path: '/question/:questionId',
      name: 'questiondetails',
      component: () => import(/* webpackChunkName: "questiondetails" */ './components/QuestionDetails.vue'),
    },
    {
      path: '/questionTag/:tagName',
      name: 'questionTag',
      component: () => import(/* webpackChunkName: "questiontag" */ './components/QuestionsByTag.vue'),
    },
  ],
});
