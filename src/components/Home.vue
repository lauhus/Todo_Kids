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
      <div class="show">
        <div class="todos">
          <h5> Pour le {{todaysDate}} : </h5>
          <h4>To Do </h4>
          <div v-if="user.roles = ['ROLE_PARENT'] || ['ROLE_PROCHE']">
            <button type="button" class="btn btn-success" v-on:click="ShowTodoFamily()">Tous les todos familiale</button>
            <button type="button" class="btn btn-success" v-on:click="AddTodo()">Ajouter des todos</button>
          </div>
            <div v-for="Todo in user.Todo" :key="Todo.id">
            <div class="todo">
              <div v-if="getFormatDate(Todo.date_todo) === todaysDate">
              <div v-if="Todo.checked === false">
                <label>{{Todo.nature_todo}}
                  <input type="checkbox" v-on:click="ChangeTrueOrFalse(Todo.id,false)" id=Todo.id>
                </label>
              </div>
              <div v-else>
                <label>{{Todo.nature_todo}}
                  <input type="checkbox"  v-on:click="ChangeTrueOrFalse(Todo.id,true)" id=Todo.id  checked>
                </label>
              </div>
              <div v-if="Todo.message_todo">
                {{Todo.message_todo}}
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="messages">
          <button type="button" class="btn btn-warning" v-on:click="AddMessage()">Laisser un message :</button>
          <h3> Vous avez des Post-it : </h3>
            <div v-for="Message in user.Message" :key="Message.id">
              <div class="message"> 
              {{Message.message}} -{{Message.author}} <button type="button" class="btn btn-outline-secondary" v-on:click="DeleteMessage(Message.id)"> X </button></div>
            </div>
        </div>
        <div class="events">
          <h4>Evenement </h4>
          <div v-if="user.roles=['ROLE_PARENT','ROLE_USER'] || ['ROLE_PROCHE','ROLE_USER']">
            <button type="button" class="btn btn-primary" v-on:click="ShowEventFamily()">Tous les événements à venir</button>
            <button type="button" class="btn btn-primary" v-on:click="AddEvent()">Ajouter un événement</button>
          </div>
            <div v-for="Event in user.Event" :key="Event.id">
              <div class="event">
              <h5>{{Event.nature_event}}</h5>
              <p> Date : {{getFormatDate(Event.date_event)}} </p>
              <p> Heure début : {{getFormatTime(Event.start_event)}} </p>
              <p> Heure fin : {{getFormatTime(Event.end_event)}} </p>
                <div v-if="Event.message_event">
                  {{Event.message_event}}
              </div>
            </div>
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
  name: 'Home',
  data () {
    return {
      Users: '',
      todaysDate: this.getFormatDate(new Date())
    }
  },
  props: {
    user: {
      required: true
    },
    token: {
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
    ChangeTrueOrFalse (id, bool) {
      let Checked = bool
      if (Checked === true) {
        this.$http.put('todos/' + id, {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json',
          'checked': false
        })
      } else {
        this.$http.put('todos/' + id, {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json',
          'checked': true
        })
      }
    },
    ShowEventFamily () {
      this.$http.get('users?family.id=' + this.user.family.id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.Users = response.data['hydra:member']
          this.$router.push({
            name: 'Events',
            params: {
              user: this.user,
              token: this.token,
              Users: this.Users
            }
          })
        })
    },
    AddEvent () {
      this.$http.get('users?family.id=' + this.user.family.id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.Users = response.data['hydra:member']
          this.$router.push({
            name: 'AddEvent',
            params: {
              user: this.user,
              token: this.token,
              Users: this.Users
            }
          })
        })
    },
    ShowTodoFamily () {
      this.$http.get('users?family.id=' + this.user.family.id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.Users = response.data['hydra:member']
          this.$router.push({
            name: 'ToDo',
            params: {
              user: this.user,
              token: this.token,
              Users: this.Users
            }
          })
        })
    },
    AddTodo () {
      this.$http.get('users?family.id=' + this.user.family.id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.Users = response.data['hydra:member']
          this.$router.push({
            name: 'AddTodo',
            params: {
              user: this.user,
              token: this.token,
              Users: this.Users
            }
          })
        })
    },
    DeleteMessage (id) {
      this.$http.delete('messages/' + id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.validation = response
          if (this.validation.status === 204) {
            alert('Message supprimé')
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
    },
    AddMessage () {
      this.$http.get('users?family.id=' + this.user.family.id, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.Users = response.data['hydra:member']
          this.$router.push({
            name: 'AddMessage',
            params: {
              user: this.user,
              token: this.token,
              Users: this.Users
            }
          })
        })
    },
    logOut (event) {
      this.$router.push({
        name: 'login',
        params: {
          message: 'Vous avez bien été déconnecté.'
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.show
{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 3%;
}
.todo
{
  border: 1px dashed #779375 ;
  padding: 1%;
  margin: 1%;
  border-radius: 3%;
}
.todos
{
  border: 2px solid #C5F7C3;
  padding: 1%;
  justify-content: center;
  border-radius: 3%;
}
.event
{
  border: 1px dashed #6988A0;
  padding: 1%;
  margin: 1%;
  border-radius: 3%;
}
.events
{
  border: 2px solid #6988A0;
  padding: 1%;
  border-radius: 3%;
}
.messages
{
  border: 2px solid #CFB84E;
  padding: 1%;
  border-radius: 4%;
}
.message
{
  border: 1px dashed #CFB84E;
  padding: 1%;
  margin: 1%;
  border-radius: 3%;
}
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