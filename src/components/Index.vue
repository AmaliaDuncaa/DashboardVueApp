<template>
  <div class="page">
    <div class="index">
      <div class="card" v-for="product in products" :key="product.id">
        <img class="card-img-top imageProduct" :src="product.Image" alt="Card image cap">

        <div class="card-body">
          <h5 class="card-title">{{product.Name}}</h5>
          <p>{{product.Price}} kr</p>
          <p>{{product.Color}}</p>
          <div class="btn-group">
            <router-link
              :to="{ name: 'EditProduct', params: {product_slug: product.slug}}"
              class="btn blue"
            >
              Edit Product
              <!-- <a href="#" class="btn btn-primary"></a> -->
            </router-link>

            <a href="#" class="red" @click="deleteProduct(product.id)">Delete Product</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import ChatWelcome from "../components/ChatWelcome.vue";
import Chat from "../components/Chat.vue";
export default {
  name: "Index",
  components: {
    ChatWelcome,
    Chat
  },

  data() {
    return {
      products: [],
      component: "ChatWelcome",
      name: null
      // chatbox: document.querySelector(".chatWelcome"),
    };
  },
  methods: {
    onClickConponent(value) {
      console.log(value);
      this.component = value;
    },
    passName(name) {
      console.log(name);
      this.name = name;
    },
    deleteProduct(id) {
      // delete doc from firestore
      console.log(id);
      db.firestore()
        .collection("Product")
        .doc(id)
        .delete()
        .then(() => {
          this.products = this.products.filter(p => {
            return p.id != id;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // fetch data from firestore
    db.firestore()
      .collection("Product")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let product = doc.data();
          product.id = doc.id;
          console.log(product);
          this.products.push(product);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="sass" scoped>
  @import "../style/main.scss"


</style>
