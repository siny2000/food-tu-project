import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Store from '@/components/Store'
import UpdateMenu from '@/components/UpMenu'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store
    },
    {
      path: '/UpdateMenu',
      name: 'UpdateMenu',
      component: UpdateMenu
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }
  ]
})
