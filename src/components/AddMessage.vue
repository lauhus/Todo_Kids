<template>
  <div>
    <header class="header">
      <h3 class="fn_user"> {{user.firstname}} </h3>
      <img class=avatar :src="getAvatar(user.avatar)" alt="Avatar">
    </header>
      <form class="AddTodo">
          Pour qui?
          <div v-for="User in Users" :key="User.id">
            <label>{{User.firstname}}
              <li> <button type="button" v-on:click="ValueOfButton(User.id)"> {{User.firstname}} </button>  </li>
            </label>
          </div>
            <label> Message ? :
                <input type="textarea" name="message_todo" v-model="message"></label>
                <button type="button" v-on:click="AddMessage" class="btn btn-primary"> Ajouter l'événement </button>
      </form>
    </div>
</template>

<script>
export default {
  name: 'AddMessage',
  data () {
    return {
      id_user: '',
      message: '',
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
    AddMessage: function (event) {
      this.$http.post('messages', {
        'Content-Type': 'application/json',
        'user': '/users/' + this.id_user,
        'message': this.message,
        'author': this.user.firstname,
        'createdAt': new Date(),
        'createdBy': this.user.id + this.user.firstname,
        'updatedAt': new Date(),
        'updatedBy': this.user.id + this.user.firstname
      })
        .then(response => {
          this.validation = response
          if (this.validation.status === 201) {
            this.$router.push({
              name: 'Home',
              params: {
                user: this.User,
                token: this.token
              }
            })
          } else {
            alert('Erreur dans le formulaire , veuillez recommencer')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>