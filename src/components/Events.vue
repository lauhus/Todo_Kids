<template>
  <div>
    <div class="header1">
      <router-link :to="{name:'Home',params:{user:this.user,token:this.token}}"><img src="../assets/logo_ToDo.png" class="logo" alt="Logo To Do , Kids"> </router-link>
      <h1 class="name_appli"> To Do, Kids </h1>
    </div>
    <div class="header2">
      <img class="avatar" :src="getAvatar(user.avatar)" alt="Avatar">
      <h3 class="fn_user"> {{user.firstname}} </h3>
      <div class="logout">
        <button type="button" class="btn btn-outline-danger" v-on:click="logOut()"> Se déconnecter </button>
      </div>
    </div>
    <div class="event">
      <h2> Evénement ou rendez-vous à venir </h2>
      <div v-for="User in Users" :key="User.id">
        <h4> Pour qui ? 
        {{User.firstname}}  </h4>
          <div v-for="eventUser in User.Event" :key="eventUser.id">
            <h6> Quoi ? : </h6>{{eventUser.nature_event}} <button type="button" v-on:click="DeleteEvent(eventUser.id)">X</button>
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
    },
    DeleteEvent (id) {
      this.$http.delete('events/' + id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.validation = response
          if (this.validation.status === 204) {
            alert('Evénement supprimé')
            this.$http.get('users/' + this.user.id, {
              headers: {
                Authorization: 'Bearer ' + this.token,
                'Content-Type': 'application/json'
              }
            })
              .then(response => {
                this.user = response.data
              })
          } else {
            alert('Erreur veuillez recommencer.')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
header{
  display: flex;
  flex-direction: column;
}
.logo
{
  height: 85%;
  width: 40%;
}
.name_appli
{
  display: flex;
  align-items: flex-start;
  margin-left: 22%;
}
.avatar{
  height: 5%;
  width: 5%;
}
.header1{
  display: flex;
  flex-direction: row;
}
.header2{
  display: flex;
  flex-direction:row;
  justify-content: center;
  border-style: solid;
  border-color: #C3C5C5;
  background-color: #C3C5C5;
  border-radius: 5% 8% 5% 8%;
  padding: 1%;
}
.logout{
  margin-left: 80%;
  margin-top: 1%;
}
.fn_user{
  margin-top: 1%;
  margin-left: 2%;
}

</style>