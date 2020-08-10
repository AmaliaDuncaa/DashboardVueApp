<template>
  <div class="card bg-light card-center-signup">
    <h4 class="card-title mt-3 text-center">Login to Account</h4>

    <p>
      <a href class="btn btn-block btn-facebook">
        <i class="fab fa-facebook-f"></i> Login via facebook
      </a>
    </p>
    <p class="divider-text">
      <span class="bg-light">OR</span>
    </p>
    <form @submit.prevent="login">
      <!-- form-group// -->
      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
        <!-- email -->
        <input v-model="email" class="form-control" placeholder="Email address" type="email">
      </div>

      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-lock"></i>
          </span>
        </div>
        <!-- Password -->
        <input v-model="password" class="form-control" placeholder="Password" type="password">
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </div>
      <p v-if="feedback">{{feedback}}</p>
      <!-- form-group// -->
    </form>
  </div>
  <!-- card.// -->
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);

      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$router.push({
              name: "Index"
            });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please fill in both fields";
      }
    }
  }
};
</script>

<style <style scoped>
.card-center-signup {
  position: absolute;
  top: 20%;
  max-width: 700px;
  margin-right: auto;
  padding: 20px;
  margin-top: 10px;
}
.divider-text {
  position: relative;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.divider-text span {
  padding: 7px;
  font-size: 12px;
  position: relative;
  z-index: 2;
}
.divider-text:after {
  content: "";
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #ddd;
  top: 55%;
  left: 0;
  z-index: 1;
}

.btn-facebook {
  background-color: #405d9d;
  color: #fff;
}
.btn-twitter {
  background-color: #42aeec;
  color: #fff;
}
</style>
