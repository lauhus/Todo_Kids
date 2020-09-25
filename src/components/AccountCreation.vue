<template>
    <div>
        <header> Vos proches ont déjà créer une famille ? Demander leurs de vous y ajouter ! <br>
        Ce n'est pas le cas ? Vous et vos proches venez d'arriver ? Bienvenue parmis nous !
        </header>
        {{family.body}}
        <div class="formAddFamilyandUser">
            <form>
                <label>Choissisez un pseudo pour votre famille : 
                    <input type="text" name="pseudo_family" v-model="pseudoFamily"></label><br>
                <hr>
                <h3> Ajoutez des à présent votre premier parent pour votre Famille </h3>
                <label> Prénom :
                    <input type="text" name="firstname" v-model="firstname"> </label><br>
                <label> Votre adresse e-mail : (Vous serviras d'identifiant)
                    <input type="email" name="email" v-model="email"> </label><br>
                <label> Veuillez confirmer votre e-mail :
                    <input type="email" name="email_validation" v-model="emailValidation"> </label><br>
                <label> Mot de passe : 
                    <input type="password" name="password" v-model="password"> </label><br>
                <label> Veuillez confirmer votre mot de passe :
                    <input type="password" name=passwordValidation v-model="passwordValidation"> </label><br>
                <label> Choisissez votre avatar : 
                    <div v-for="avatar in avatars" :key="avatar" class="avatar">
                        <button type="button" v-on:click="ValueOfButtonAvatar(avatar)"> <img :src="getAvatar(avatar)" alt="avatar"> </button>
                    </div>
                </label>
                <button type="button" v-on:click="formAddFamilyandUser" class="btn btn-primary" > Valider </button>
            </form>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  name: 'AccountCreation',
  data () {
    return {
      avatars: ['0_b', '0_g', '0_m', '0_p', '0_y', '1_b', '1_g', '1_m', '1_p', '1_y', '2_b', '2_g', '2_m', '2_p', '2_y', '3_b', '3_g', '3_m', '3_p', '3_y', '4_b', '4_g', '4_m', '4_p', '4_y', '5_b', '5_g', '5_m', '5_p', '5_y'],
      avatar: '',
      pseudoFamily: '',
      firstname: '',
      email: '',
      emailValidation: '',
      password: '',
      passwordValidation: '',
      family: '',
      roles: ['ROLE_USER', 'ROLE_PARENT'],
      user: '',
      validation: '',
      token: '',
      passwordHash: ''
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
    ValueOfButtonAvatar (avatar) {
      this.avatar = avatar
    },
    formAddFamilyandUser (event) {
      if (this.email === this.emailValidation && this.password === this.passwordValidation) {
        this.addFamily()
      } else {
        alert('L\'email ou le mot de passe ne correspond pas , veuillez recommencer . ')
      }
    },
    addFamily () {
      this.$http.post('families', {
        'Content-Type': 'application/json',
        'pseudoFamily': this.pseudoFamily,
        'createdAt': new Date(),
        'createdBy': 'first user',
        'updatedAt': new Date(),
        'updatedBy': 'first user'
      })
        .then(response => {
          this.family = response
          console.log(this.family)
          if (this.family.status === 201) {
            this.addUser()
          } else {
            alert('Erreur pendant l\'enregistrement veuillez recommencer.')
          }
        })
    },
    addUser () {
      this.passwordHash = this.password
      this.$http.post('users', {
        'Content-Type': 'application/json',
        'family': '/families/' + this.family.body.id,
        'roles': this.roles,
        'password': this.passwordHash,
        'email': this.email,
        'firstname': this.firstname,
        'avatar': this.avatar,
        'createdAt': new Date(),
        'createdBy': 'self',
        'updatedAt': new Date(),
        'updatedBy': 'self'
      })
        .then(response => {
          this.validation = response
          this.user = response.body
          console.log(this.user)
          if (this.validation.status === 201) {
            this.login()
          } else {
            alert('Erreur lors de l\'enregistrement veuillez recommencer.')
          }
        })
    },
    login () {
      this.$http.post('authentication_token', {
        'Content-Type': 'application/json',
        'email': this.email,
        'password': this.password
      })
        .then(response => {
          this.token = response
          if (this.Token.ok === true && this.Token.status === 200) {
            this.$router.push({
              name: 'Home',
              params: {
                user: this.user,
                token: this.token.body['token']
              }
            })
          } else {
            alert('Erreur lors de l\'enregistrement veuillez recommencer.')
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
.formAddFamilyandUser{
    display: flex;
    flex-direction: column;
}
.avatar{
    display: flex;
    flex-direction:column;
    flex-wrap:wrap;
}
</style>