<template>
  <div class="upload">
    <img :src="this.imgURL" class="imgSmall img-thumbnail">
    <progress max="100" :value="value" id="uploader">0%</progress>
    <input @change="uploadImage" type="file" value="upload" id="fileButton" ref="myFiles">
    <button @click="deleteImage" class="delete-btn">Delete Image</button>
  </div>
</template>
<script>
import firebase from "@/firebase/init.js";

export default {
  name: "UploadImage",
  data() {
    return {
      value: 0,
      fileButton: document.querySelector("#fileButton"),
      file: [],
      imgURL: null,
      imgRef: null
    };
  },
  methods: {
    uploadImage(event) {
      //Get file
      this.file = this.$refs.myFiles.files[0];

      console.log(this.file);

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
          console.log(this.imgURL);
          this.$emit("clicked", this.imgURL);
        });
      });
    },
    deleteImage() {
      // Get the storage in Firebase
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      var desertRef = storageRef.child(this.imgRef);

      desertRef
        .delete()
        .then(function() {
          console.log("Image deleted");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>