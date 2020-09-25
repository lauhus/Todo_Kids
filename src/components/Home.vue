<template>
  <div>
    <div>
      <header class="header">
        <h3 class="fn_user"> {{user.firstname}} </h3>
        <img class=avatar :src="getAvatar(user.avatar)" alt="Avatar">
      </header>
      {{user}}
      <div class="show">
        <div class="todo">
          <h4>To Do </h4>
          <div v-if="user.roles[0]=['ROLE_PARENT'] || ['ROLE_PROCHE']">
            <button type="button" v-on:click="ShowTodoFamily()">Tous les Todos familiale</button>
            <button type="button" v-on:click="AddTodo()">Ajouter des Todos</button>
          </div>
            <div v-for="Todo in user.Todo" :key="Todo.id">
              <div v-if="Todo.checked === false">
                <label>{{Todo.nature_todo}}
                  <input type="checkbox" v-model="Checked" v-on:click="ChangeTrueOrFalse(Todo.id)" value="false" name="Todo.nature_todo">
                </label>
              </div>
              <div v-else>
                <label>{{Todo.nature_todo}}
                  <input type="checkbox" v-model="Checked" v-on:click="ChangeTrueOrFalse(Todo.id)" value="true" name="Todo.nature_todo" checked>
                </label>
              </div>
              <div v-if="Todo.message_todo" class="message">
                {{Todo.message_todo}}
              </div>
            </div>
        </div>
        <div class="message">
          <button type="button" v-on:click="AddMessage()">Laisser un message :</button>
          <h3> Vous avez des Post-it : </h3>
            <div v-for="Message in user.Message" :key="Message.id">
              <div class="header_postit"> 
                <button type="button" v-on:click="AlertDeleteMessage()"> X </button></div>
              {{Message.message}} 
              {{Message.author}}
            </div>
        </div>
        <div class="event">
          <div v-if="user.roles=['ROLE_PARENT','ROLE_USER'] || ['ROLE_PROCHE','ROLE_USER']">
            <button type="button" v-on:click="ShowEventFamily()">Tous les événements à venir</button>
            <button type="button" v-on:click="AddEvent()">Ajouter un événement</button>
          </div>
          <h4>Evenement </h4>
            <div v-for="Event in user.Event" :key="Event.id">
              <h5>{{Event.nature_event}}</h5>
              <p> Date : {{getFormatDate(Event.date_event)}} </p>
              <p> Heure début : {{getFormatTime(Event.start_event)}} </p>
              <p> Heure fin : {{getFormatTime(Event.end_event)}} </p>
                <div v-if="Event.message_event" class="message">
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
      Checked: '',
      Users: ''
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
    ChangeTrueOrFalse (id) {
      let Checked = this.Checked
      console.log(this.token)
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
          console.log(this.Users)
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
          console.log(this.Users)
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
          console.log(this.Users)
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
          console.log(this.Users)
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
    AlertDeleteMessage (event) {
      alert('Attention vous allez supprimer définitivement ce message. Etes-vous sur ?')
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
          console.log(this.Users)
          this.$router.push({
            name: 'AddMessage',
            params: {
              user: this.user,
              token: this.token,
              Users: this.Users
            }
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header{
  display: flex;
  margin-top: 1%;
  border: 1px solid grey;
  padding: 0.5%;
}
.fn_user{
  margin: 1% 1% 1% 1%;
}
.avatar{
  height: 4%;
  width: 4%;
}
.show{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 3%;
}
.todo{
  border: 2px solid rgba(52, 163, 98);
  padding: 1%;
}
.event{
  border: 2px solid rgba(52, 163, 98);
  padding: 1%;

}

</style>