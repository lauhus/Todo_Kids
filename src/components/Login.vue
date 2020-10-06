<template>
  <div>
    <header>
      <img src="../assets/logo_ToDo.png" alt="Logo To Do , Kids">
      <h1 class="name_appli"> To Do , Kids </h1>
    </header>
    <div>
      <div v-if="message_alert">
        <div class="message_alert alert alert-success" role="alert">
        <p> {{message_alert}} </p>
        </div>
      </div>
      <form class="login_form">
        <label>Identifiant : <br>
          <input v-model="Email" type="text" name="Email" placeholder="email@mail.fr" required>
        </label>
        <br>
        <label>Mot de passe:<br>
          <input v-model="Password" type="password" name="Password" required>
        </label>
        <br>
        <button v-on:click="checkForm" type="button" name="submit" class="btn btn-primary">Connectez vous </button>
      </form>
      <div class="link_registration">
        <p> Pas encore de compte ? Créez-en un ! </p>
        <router-link :to="{name:'AccountCreation'}"> Inscrivez-vous </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {
  name: 'Login',
  data () {
    return {
      Email: '',
      Password: '',
      Token: '',
      User: '',
      Users: ''
    }
  },
  props: {
    message_alert: {
      required: false
    }
  },
  http: {
    root: 'http://127.0.0.1:8000/'
  },
  methods: {
    checkForm: function (event) {
      this.$http.post('authentication_token',
        {
          'Content-Type': 'application/json',
          'email': this.Email,
          'password': this.Password
        }
      )
        .then(
          response => {
            this.Token = response
            if (this.Token.ok === true && this.Token.status === 200) {
              this.$http.get('users?email=' + this.Email, {
                headers: {
                  Authorization: 'Bearer ' + this.Token.body['token'],
                  'Content-Type': 'application/json'
                }
              })
                .then(response => {
                  this.User = response.data['hydra:member'][0]
                  sessionStorage.setItem('user', this.User)
                  this.$router.push({
                    name: 'Home',
                    params: {
                      user: this.User,
                      token: this.Token.body['token']
                    }
                  })
                })
            } else {
              alert('Erreur dans les identifiants')
            }
          },
          response => {
            console.log('erreur', response)
          }
        )
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
.message_alert
{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-top: 5%;
}
.login_form
{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-top: 5%;
}
.link_registration
{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-top: 5%;
}
img
{
  height: 10%;
  width: 10%;
}
.name_appli
{
  display: flex;
  text-align: center;
  align-items: flex-start;
  margin-left: 34%;
}
header{
  display: flex;
  flex-direction: row;
}
</style>

