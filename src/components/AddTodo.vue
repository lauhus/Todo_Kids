<template>
  <div>
    <div v-if="!user">
      {{returnToConnect()}}
    </div>
    <div v-else>
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
      <form class="AddTodo">
        <label>
          Pour qui?
          <div v-for="User in Users" :key="User.id">
              <button type="button" class="btn btn-success" v-on:click="ValueOfButton(User.id)"> {{User.firstname}} </button>
          </div>
        </label>
      <label> Quoi ? 
        <input type="text" name="nature_event" v-model="nature_todo"></label>
      <label> Quand ?
        <input type="date" name="date_event" v-model="date_todo"></label>
      <label> Une précision ? 
        <input type="textarea" name="message_todo" v-model="message_todo"></label>
        <button type="button" v-on:click="AddTodo" class="btn btn-success"> Ajouter le Todo </button>
      </form>
  </div>
    </div>
</template>

<script>
export default {
  name: 'AddTodo',
  data () {
    return {
      id_user: '',
      nature_todo: '',
      date_todo: '',
      checked: '',
      message_todo: '',
      validation: ''
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
    ValueOfButton (id) {
      this.id_user = id
    },
    AddTodo: function (event) {
      this.$http.post('todos', {
        'Content-Type': 'application/json',
        'user': '/users/' + this.id_user,
        'natureTodo': this.nature_todo,
        'checked': false,
        'dateTodo': this.date_todo,
        'messageTodo': this.message_todo,
        'createdAt': new Date(),
        'createdBy': this.user.id + this.user.firstname,
        'updatedAt': new Date(),
        'updatedBy': this.user.id + this.user.firstname
      })
        .then(response => {
          this.validation = response
          if (this.validation.status === 201) {
            alert('ToDo ajouté avec succès !')
            this.nature_todo = ''
            this.date_todo = ''
            this.checked = ''
            this.message_todo = ''
            this.validation = ''
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
            alert('Erreur dans le formulaire , veuillez recommencer')
          }
        })
    },
    logOut (event) {
      this.$router.push({
        name: 'Login',
        params: {
          message_alert: 'Vous avez bien été déconnecté.'
        }
      })
    },
    returnToConnect () {
      this.$router.push({
        name: 'Login',
        params: {
          message_alert: "Veuillez vous connecter pour accéder à l'application"
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body
{
font-family:trebuchet, helvetica, sans-serif;
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
.AddTodo
{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-top: 5%;
}
button
{
  margin-top: 2%;
}
@media screen and (max-width: 1300px) {
  .logo
  {
    height: 60%;
    width: 40%;
  }
  .name_appli
  {
    margin-left: 0%;
  }
  .avatar
  {
  height: 10%;
  width: 10%;
  }
  .header1{
    display: flex;
    flex-direction: row;
  }
  .header2
  {
  padding: 0%;
  }
  .logout
  {
  margin-left: 20%;
  margin-top: 1%;
  }
  .fn_user
  {
  margin-top: 1%;
  margin-left: 2%;
  }
}

</style>