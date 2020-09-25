<template>
  <div>
    <header class="header">
      <h3 class="fn_user"> {{user.firstname}} </h3>
      <img class=avatar :src="getAvatar(user.avatar)" alt="Avatar">
    </header>
    <div class="event">
      <h2> Evénement ou rendez-vous à venir </h2>
      <div v-for="User in Users" :key="User.id">
        <h4> Pour qui ?
        {{User.firstname}}  </h4>
          <div v-for="eventUser in User.Event" :key="eventUser.id">
            <h6> Quoi ? : </h6>{{eventUser.nature_event}}
            <h6> Quand ? : </h6>{{getFormatDate(eventUser.date_event)}}
            <h6> Début : </h6>{{getFormatTime(eventUser.start_event)}}
            <h6> Fin : </h6>{{getFormatTime(eventUser.end_event)}}
            <h6> Précision : </h6>{{eventUser.message_event}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueFilterDateFormat from 'vue-filter-date-format'
import moment from 'moment'
Vue.use(VueFilterDateFormat)
Vue.use(VueResource)
export default {
  name: 'Events',
  data () {
    return {
      Users: ''
    }
  },
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
    },
    getFormatDate (date) {
      return moment(String(date)).format('DD-MM-YYYY')
    },
    getFormatTime (time) {
      return moment(String(time)).format('HH:mm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>