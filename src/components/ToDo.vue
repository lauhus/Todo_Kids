<template>
  <div>
    <header class="header">
      <h3 class="fn_user"> {{user.firstname}} </h3>
      <img class=avatar :src="getAvatar(user.avatar)" alt="Avatar">
    </header>
    <div class="todo">
    <h2> Toutes les Todos </h2>
    <div v-for="User in Users" :key="User.id">
      <h4> Pour qui ? </h4>
      {{User.firstname}}
        <div v-for="todoUser in User.Todo" :key="todoUser.id">
          <h6> Quoi ? </h6> {{todoUser.nature_todo}}
          <h6> Quand ? </h6> {{todoUser.date_todo}}
          <h6> Fait ou à faire ? </h6> 
            <div v-if="todoUser.checked === false"> A faire  </div>
            <div v-if="todoUser.checked === true"> Fait !  </div>
          <h6> Précision : </h6> {{todoUser.message_todo}}
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
  name: 'ToDo',
  props: {
    user: {
      required: true
    },
    token: {
      required: true
    },
    Users: {
      required: true
    }
  },
  http: {
    root: 'http://127.0.0.1:8000/'
  },
  methods: {
    getAvatar (avatar) {
      let Avatar = ('../static/img/avatar/' + avatar + '.png')
      return Avatar
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>