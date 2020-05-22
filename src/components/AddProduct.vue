<template>
  <div class="card">
    <h5 class="card-header"></h5>
    <!--Card content-->
    <div class="card-body">
      <!-- Form -->
      <form @submit.prevent="addProduct" class="#" style="color: #757575;" action="#!">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputName">Name the Product</label>
            <input
              type="Name Product"
              class="form-control"
              id="inputName"
              placeholder="Name"
              v-model="name"
            >
          </div>
          <div class="form-group col-md-4">
            <!--  <label for="inputState">Category</label>
             <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>lamp</option>
              <option>not a lamp</option>
            </select>-->
          </div>
        </div>
        <!-- <div class="form-group">
          <select id="inputState" class="form-control">
            <option selected>Choose a Picture</option>
            <option>lamp white</option>
            <option>lamp black</option>
          </select>
        </div>-->

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputColor">Color</label>
            <input type="text" class="form-control" id="inputColor" v-model="color">
          </div>

          <div class="form-group col-md-2">
            <label for="inputPrice">Price</label>
            <input type="text" class="form-control" id="inputPrice" v-model="price">
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">in stock</label>
          </div>
        </div>
        <UploadImage @clicked="onClickChild"/>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import UploadImage from "../components/UploadImage.vue";
//import { scrypt } from "crypto";
export default {
  name: "Add-Product",
  components: {
    UploadImage
  },
  data() {
    return {
      name: null,
      color: null,
      price: null,
      urlImg: null
    };
  },
  methods: {
    onClickChild(value) {
      console.log(value); // someValue
      this.urlImg = value;
    },
    addProduct() {
      if (this.name) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
        //save smoothie to firestore
        db.firestore()
          .collection("Product")
          .add({
            Name: this.name,
            Color: this.color,
            Price: this.price,
            Image: this.urlImg,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scooped>
.card {
  position: absolute;
  top: 2em;
  left: 10%;
  width: 50%;
  margin-left: 25%;
  margin-top: 60px;
}
</style>
