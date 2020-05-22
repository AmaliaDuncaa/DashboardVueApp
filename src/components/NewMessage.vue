<template>
  <div class="card-footer">
    <div class="input-group">
      <div class="input-group-append">
        <span class="input-group-text attach_btn">
          <i class="fas fa-paperclip"></i>
        </span>
      </div>
      <form @submit.prevent="addMessage">
        <input
          type="text"
          class="form-control type_msg"
          placeholder="Type your message..."
          name="new-message"
          v-model="newMessage"
        >
      </form>

      <div class="input-group-append">
        <span class="input-group-text send_btn">
          <i class="fas fa-location-arrow"></i>
        </span>
      </div>
    </div>
    <p v-if="feedback" class="red-text">{{ feedback }}</p>
  </div>
  <!-- <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New message (enter to add):</label>
      <input type="text" name="new-message" v-model="newMessage">
    </form>
  </div>-->
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "NewMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      console.log(this.newMessage, this.name, Date.now());

      if (this.newMessage) {
        db.firestore()
          .collection("messages")
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message";
      }
    }
  }
};
</script>

<style>
.red-text {
  color: red;
}
.card-footer {
  background-color: grey;
}
.form-control {
  width: 300px;
}
</style>