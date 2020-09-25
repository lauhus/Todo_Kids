<template>
  <div>
    <div>
      <form class="login_form">
        <label>Identifiant : <br>
          <input v-model="Email" type="text" name="Email" placeholder="email@mail.fr">
        </label>
        <br>
        <label>Mot de passe:<br>
          <input v-model="Password" type="password" name="Password">
        </label>
        <br>
        <button v-on:click="checkForm" type="button" name="submit" class="btn btn-primary">Connectez vous </button>
      </form>
      <div>
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
.login_form
{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-top: 5%;
}
</style>

