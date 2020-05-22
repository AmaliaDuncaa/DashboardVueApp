<template>
  <div id="nav">
    <!-- Vertical navbar -->
    <div class="vertical-nav vertical-nav--color" id="sidebar">
      <div class="py-4 px-3 mb-4">
        <div class="media d-flex align-items-center">
          <img
            src="../../static/customer-service.png"
            alt="..."
            width="65"
            class="mr-3 rounded-circle img-thumbnail shadow-sm"
          >
          <div class="media-body">
            <h4 class="m-0">{{ userId}}</h4>
            <p class="font-weight-light text-muted mb-0">Administrator</p>
          </div>
        </div>
      </div>
      <!--Login Buttons-->
      <div class="auth">
        <span v-if="!user" class>
          <router-link :to="{ name: 'Signup' }" class="red">Signup</router-link>
        </span>

        <span v-if="!user" class type="submit">
          <router-link :to="{ name: 'Login' }" class="blue">Login</router-link>
        </span>

        <p v-if="user" class="user">{{user.email}}</p>
        <button v-if="user" class="btn btn-outline-danger my-2 my-sm-0">
          <a @click="logout">Logout</a>
        </button>
      </div>
      <!--End Login Buttons-->
      <!--interaction navigation-->
      <div class="interaction-user-nav" v-if="user">
        <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Main</p>
        <ul class="nav flex-column mb-0">
          <div class="nav--hover">
            <li class="nav-item">
              <router-link :to="{name: 'Index'}">
                <span class="nav-link color-blue">
                  <i class="fa fa-th-large mr-3 fa-fw color-blue"></i>Home
                </span>
              </router-link>
            </li>
          </div>

          <li class="nav-item">
            <router-link :to="{ name: 'AddProduct' }">
              <span class="nav-link color-blue">
                <i class="fas fa-cart-plus mr-3 color-blue fa-fw"></i>
                Add Products
              </span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'UserInfo',params:{id: userId} }">
              <span class="nav-link color-blue">
                <i class="fa fa-address-card mr-3 color-blue fa-fw"></i>
                About
              </span>
            </router-link>
          </li>
        </ul>

        <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Customers</p>

        <ul class="nav flex-column mb-0">
          <li class="nav-item">
            <router-link :to="{ name: 'ChatWelcome' }">
              <span class="nav-link color-blue">
                <i class="far fa-comment-alt mr-3 color-blue fa-fw"></i>
                Chat
              </span>
            </router-link>

            <!-- <keep-alive>
      <component
        @clicked="onClickConponent"
        @name="passName"
        v-bind:is="component"
        :name="name"
        class="chat"
      ></component>
            <ChatWelcome  :chatbox="chatbox" @click="chatShow()"/>-->
            <!--/keep-alive> -->
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'GMap' }">
              <span class="nav-link color-blue">
                <i class="far fa-map mr-3 color-blue fa-fw"></i>
                Map
              </span>
            </router-link>
          </li>
          <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">charts</p>
          <li class="nav-item">
            <span class="nav-link color-blue">
              <i class="fas fa-chart-line mr-3 color-blue fa-fw"></i>chart line
            </span>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link color-blue">
              <i class="fas fa-chart-pie mr-3 color-blue fa-fw"></i>Pie charts
            </a>
          </li>
          <!-- <li class="nav-item">
            <a href="#" class="nav-link color-blue">
              <i class="fas fa-chart-bar mr-3 color-blue fa-fw"></i>Pie charts
            </a>
          </li>-->
        </ul>
      </div>
    </div>
    <!-- End interaction navigation-->
    <!-- End vertical navbar -->

    <!-- Page content holder -->
    <div class="page-content p-5" id="content">
      <!-- Toggle button -->
      <!-- <button
        id="sidebarCollapse"
        type="button"
        class="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"
      >
        <i class="fa fa-bars mr-2"></i>
        <small class="text-uppercase font-weight-bold">Toggle</small>
      </button>-->
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Nav",
  data() {
    return {
      user: null,
      usersEmail: null,
      userId: null
    };
  },
  methods: {
    // getUser() {
    //   usersEmail.forEach(u => {
    //     if (u == this.user.email) {
    //       this.userId = u.;
    //     }
    //   });
    // },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },
  created() {
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        db.firestore()
          .collection("users")
          .get()
          .then(users => {
            users.docs.forEach(doc => {
              if (doc.data().email == this.user.email) {
                this.userId = doc.data().name;
                console.log(this.userId);
              }
            });
          });
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../style/main.scss"
  
</style>;

