<template>
  <div class="chatWelcome">
    <div class="chat-head">
      <svg
        class="bi bi-chat-dots-fill text-welcome chat-icon"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div class="text-chat-welcome">
        <h2 class="text">
          Hi there!
          <span>&#128075;</span>
        </h2>
      </div>
    </div>
    <div class="chat-body">
      <h2>Come to Chat</h2>
      <!-- <div class="avatar">
        <img :src="this.imgURL" class="rounded-circle add-avatar">
        <input
          @change="uploadImage"
          type="file"
          value="upload"
          id="fileButton"
          ref="myFiles"
          class="add_avatar_icon"
        >
         <span @change="uploadImage" id="fileButton" class="add_avatar_icon">
          <span class="add_icon">&#43;</span>
        </span>
      </div>-->

      <form @submit.prevent="enterChat">
        <label for="name">Enter your name:</label>
        <input id="name" type="text" name="name" v-model="name">
        <p v-if="feedback" class="feedback">{{feedback}}</p>
        <button @click="changeChat" class="btn primary">Join Chat</button>
      </form>
    </div>
  </div>
</template>
<script>
import firebase from "@/firebase/init.js";
import Chat from "../components/Chat.vue";

export default {
  name: "ChatWelcome",
  props: ["component"],
  data() {
    return {
      name: null,
      feedback: null,
      e: null,
      fileButton: document.querySelector("#fileButton"),
      file: [],
      imgURL: "../../static/avatar.png",
      imgRef: null
    };
  },
  methods: {
    // upload avatar
    uploadImage(event) {
      //Get file
      this.file = this.$refs.myFiles.files[0];
      //Create a storage ref
      let storageRef = firebase
        .storage()
        .ref("photos/" + Date.now() + this.file.name);
      //Save the image reference, if we want to delete the picture
      this.imgRef = storageRef.fullPath;
      //upload file
      let task = storageRef.put(this.file);

      task.on("state_changed", snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.value = percentage;

        snapshot.ref.getDownloadURL().then(downloadURL => {
          //Save the image URL, if we want to view the image on the page;
          this.imgURL = downloadURL;
        });
      });
    },
    // end here

    enterChat(e) {
      if (this.name) {
        this.e = "Chat";
        this.$router.push({
          name: "Chat",
          params: { id: this.name }
        });
        this.$emit("clicked", this.e);
        this.feedback = null;
      } else {
        this.feedback = "you must enter a neame";
      }
    },
    changeChat(name) {
      this.$emit("name", this.name);
    }
  }
};
</script>
<style lang="sass" scoped>
  @import "../style/main.scss"
  
</style>;
