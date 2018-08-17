import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/views/index.vue'], resolve),
    },
    {
      path: '/article_detail',
      name: 'article_detail',
      component: (resolve) => require(['@/views/article_detail.vue'], resolve),
    }, 
    {
      path: '/comment',
      name: 'comment',
      component: (resolve) => require(['@/views/comment.vue'], resolve),
    },
    {
      path: '/themes_daily',
      name: 'themes_daily',
      component: (resolve) => require(['@/views/themes_daily.vue'], resolve),
    }
  ]
})
