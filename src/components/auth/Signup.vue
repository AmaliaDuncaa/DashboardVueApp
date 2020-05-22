<template>
  <div class="card bg-light card-center-signup">
    <h4 class="card-title mt-3 text-center">Create Account</h4>
    <p class="text-center">Get started with your free account</p>
    <p>
      <a href class="btn btn-block btn-facebook">
        <i class="fab fa-facebook-f"></i> Login via facebook
      </a>
    </p>
    <p class="divider-text">
      <span class="bg-light">OR</span>
    </p>
    <form @submit.prevent="signup">
      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-user"></i>
          </span>
        </div>
        <!-- name -->
        <input v-model="name" class="form-control" placeholder="Name" type="text">
      </div>
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
      <!-- form-group// -->
      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-phone"></i>
          </span>
        </div>
        <!-- phoneNumber -->
        <input v-model="phoneNumber" class="form-control" placeholder="Phone number" type="text">
      </div>
      <!-- ShippingAdress   -->
      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-building"></i>
          </span>
        </div>
        <input v-model="address" class="form-control" placeholder="Shipping address" type="text">
      </div>

      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-lock"></i>
          </span>
        </div>
        <!-- Password -->
        <input
          v-model="password"
          class="form-control"
          placeholder="Create password"
          type="password"
        >
      </div>
      <!-- form-group// -->
      <div class="form-group input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-lock"></i>
          </span>
        </div>
        <!--Repete password -->
        <input
          v-model="repetePassword"
          class="form-control"
          placeholder="Repeat password"
          type="password"
        >
      </div>
      <!-- form-group// -->

      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Create Account</button>
      </div>
      <p>{{feedback}}</p>
      <!-- form-group// -->
    </form>
  </div>
  <!-- card.// -->
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      repetePassword: null,
      phoneNumber: null,
      address: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (
        this.name &&
        this.email &&
        this.password &&
        this.phoneNumber &&
        this.address
      ) {
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
        let ref = db
          .firestore()
          .collection("users")
          .doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This name already exists";
          } else {
            // this alias does not yet exists in the db
            if (this.password === this.repetePassword) {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  console.log(cred.user);
                  ref.set({
                    name: this.name,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    address: this.address,
                    geolocation: null,
                    user_id: cred.user.uid
                  });
                })
                .then(() => {
                  this.$router.push({
                    name: "UserInfo",
                    params: { id: doc.id }
                  });
                })
                .catch(err => {
                  console.log(err.message);
                  this.feedback = err.message;
                });
            } else {
              this.feedback = "Password doesn't match";
            }
          }
        });
      } else {
        this.feedback = "Please fill all fields";
      }
    }
  }
};
</script>

<style <style scoped>
.card-center-signup {
  position: absolute;
  top: 5%;
  left: 50%;
  max-width: 400px;
  margin-left: auto;
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


