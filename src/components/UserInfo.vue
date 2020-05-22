<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="center">{{ profile.name }}'s wall</h2>
      <h3>email: {{profile.email}}</h3>
      <h3>phone number: {{profile.phoneNumber}}</h3>
      <h3>address: {{profile.address}}</h3>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "UserInfo",
  data() {
    return {
      profile: null
    };
  },
  created() {
    let ref = db.firestore().collection("users");
    console.log(this.$route.params.id);
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });
  }
};
</script>

<style scooped>
.view-profile {
  position: absolute;
  top: 10%;
  left: 30%;
  max-width: 700px;
}

h2 {
  text-transform: uppercase;
  color: orange;
  text-align: center;
  padding: 20px;
}
.view-profile .card {
  padding: 20px;
}
</style>
