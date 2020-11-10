import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Search from '../page/search'
import VipLogin from '@/components/viplogin'
import VipRegister from '@/components/vipregister'
import Login from '@/page/login'
import register from "../page/register";
import success_action from "../page/RegisterSuccess"


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/good',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/viplogin',
      name: 'viplogin',
      component: VipLogin
    },
    {
      path: '/vipregister',
      name: 'vipregister',
      component: VipRegister
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/success_action',
      name: 'success_action',
      component: success_action
    }

  ]
})
