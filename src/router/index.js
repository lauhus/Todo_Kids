import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ToDo from '@/components/ToDo'
import Events from '@/components/Events'
import AddEvent from '@/components/AddEvent'
import AddTodo from '@/components/AddTodo'
import AddMessage from '@/components/AddMessage'
import AccountCreation from '@/components/AccountCreation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/Todo',
      name: 'ToDo',
      component: ToDo,
      props: true
    },
    {
      path: '/Evenement',
      name: 'Events',
      component: Events,
      props: true
    },
    {
      path: '/AjoutEvenement',
      name: 'AddEvent',
      component: AddEvent,
      props: true
    },
    {
      path: '/AjoutTodo',
      name: 'AddTodo',
      component: AddTodo,
      props: true
    },
    {
      path: '/AjoutMessage',
      name: 'AddMessage',
      component: AddMessage,
      props: true
    },
    {
      path: '/CreationCompte',
      name: 'AccountCreation',
      component: AccountCreation
    }
  ]
})
