<template>
  <div>
    <header class="header">
      <h3 class="fn_user"> {{user.firstname}} </h3>
      <img class=avatar :src="getAvatar(user.avatar)" alt="Avatar">
    </header>
      <form class="AddEvent">
        <label>
          Pour qui?
          <div v-for="User in Users" :key="User.id">
            <label>{{User.firstname}}
              <li> <button type="button" class="btn btn-info" v-on:click="ValueOfButton(User.id)"> {{User.firstname}} </button>  </li>
            </label>
          </div>
        </label>
      <label> Quoi ? :
        <input type="text" name="nature_event" v-model="nature_event"></label>
      <label> Quand ?
        <input type="date" name="date_event" v-model="date_event"></label>
      <label> A quelle heure ? :
        <input type="time" name="start_event" v-model="start_event"></label>
      <label> Jusqu'a qu'elle heure ? :
        <input type="time" name="end_event" v-model="end_event"></label>
      <label> Quelques chose à rajouter ? :
        <input type="textarea" name="message_event" v-model="message_event"></label>
        <button type="button" v-on:click="AddEvent" class="btn btn-primary"> Ajouter l'événement </button>
      </form>
    </div>
</template>

<script>
export default {
  name: 'AddEvent',
  data () {
    return {
      id_user: '',
      nature_event: '',
      date_event: '',
      start_event: '',
      end_event: '',
      message_event: '',
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
    AddEvent: function (event) {
      this.$http.post('events', {
        'Content-Type': 'application/json',
        'user': '/users/' + this.id_user,
        'natureEvent': this.nature_event,
        'dateEvent': this.date_event,
        'startEvent': this.start_event,
        'endEvent': this.end_event,
        'messageEvent': this.message_event,
        'createdAt': new Date(),
        'createdBy': this.user.id + this.user.firstname,
        'updatedAt': new Date(),
        'updatedBy': this.user.id + this.user.firstname
      })
        .then(response => {
          this.validation = response
          if (this.validation.status === 201) {
            this.$router.push({
              name: 'Events',
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