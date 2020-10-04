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
    <div>
        <form class="AddUsers">
            <label> E-mail de l'utilisateur: (chaque utilisateur doit avoir une adresse personnelle)
                <input type="email" placeholder="email@mail.fr" v-model="email">
            </label>
            <label>
                <input type="email" placeholder="email@mail.fr" v-model="validation_email">
            </label>
            <label> Mot de passe :
                <input type="password" v-model="password">
            </label>
            <label>Veuillez confirmer le mot de passe :
                <input type="password" v-model="validation_password">
            </label>
            <label>Prénom :
                <input type="text" v-model="firstname">
            </label>
            <p> Rôles : </p>
            <label>Parent
                <input type="radio" value='["ROLE_PARENT","ROLE_USER"]' v-model="roles">
            </label>
            <label>Enfant
                <input type="radio" value='["ROLE_ENFANT,"ROLE_USER"]' v-model="roles">
            </label>
            <label> Choisissez votre avatar : 
                <div v-for="avatar in avatars" :key="avatar" class="avatar_choice">
                    <button type="button" v-on:click="ValueOfButtonAvatar(avatar)"> <img :src="getAvatar(avatar)" alt="avatar"> </button>
                </div>
            </label>
            <button type="button" class="btn btn-info" v-on:click="AddUser()">Valider</button>
        </form>
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
  name: 'AddUserInFamily',
  data () {
    return {
      validation: '',
      avatars: ['0_b', '0_g', '0_m', '0_p', '0_y', '1_b', '1_g', '1_m', '1_p', '1_y', '2_b', '2_g', '2_m', '2_p', '2_y', '3_b', '3_g', '3_m', '3_p', '3_y', '4_b', '4_g', '4_m', '4_p', '4_y', '5_b', '5_g', '5_m', '5_p', '5_y'],
      email: '',
      validation_email: '',
      password: '',
      validation_password: '',
      firstname: '',
      avatar: '',
      roles: ''
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
    AddUser () {
      if (this.validation_email === this.email && this.validation_password === this.password) {
        this.$http.post('users', {
          'Content-Type': 'application/json',
          'family': '/families/' + this.user.family.id,
          'roles': this.roles,
          'plainPassword': this.password,
          'email': this.email,
          'firstname': this.firstname,
          'avatar': this.avatar,
          'createdAt': new Date(),
          'createdBy': this.user.firstname + this.user.id,
          'updatedAt': new Date(),
          'updatedBy': this.user.firstname + this.user.id
        })
          .then(response => {
            this.validation = response
            if (this.validation.status === 201) {
              alert('Nouveau membre ajouté dans votre famille !')
              this.validation = ''
              this.email = ''
              this.validation_email = ''
              this.password = ''
              this.validation_password = ''
              this.firstname = ''
              this.avatar = ''
              this.roles = ''
            } else {
              alert('Erreur lors de l\'enregistrement veuillez recommencer.')
            }
          })
      } else {
        alert('Erreur dans le formulaire veuillez recommencer')
      }
    },
    ValueOfButtonAvatar (avatar) {
      this.avatar = avatar
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
.AddUsers
{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:space-around;
  margin-top: 5%;
}
body
{
font-family:trebuchet, helvetica, sans-serif;
}
.todo
{
  border: 1px dashed #779375 ;
  padding: 1%;
  margin: 1%;
  border-radius: 30px;
}
.todos
{
  border: 2px solid #C5F7C3;
  padding: 1%;
  justify-content: center;
  border-radius: 30px;
}
header
{
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