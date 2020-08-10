<template>
  <div class="card">
    <h5 class="card-header">
      <img v-if="!urlImg" :src="urlImg" class="card-img-top imageProduct" alt="Card image cap">
      <img
        v-else-if="!urlImg"
        :src="product.Image"
        class="card-img-top imageProduct"
        alt="Card image cap"
      >
    </h5>
    <!--Card content-->
    <div class="card-body">
      <!-- Form -->
      <form @submit.prevent="editProduct" class="#" style="color: #757575;" action="#!">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputName">Change Product Name</label>
            <input
              type="Name Product"
              class="form-control"
              id="inputName"
              placeholder="Name"
              v-model="product.Name"
            >
          </div>
          <div class="form-group col-md-4"></div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputColor">Color</label>
            <input type="text" class="form-control" id="inputColor" v-model="product.Color">
          </div>

          <div class="form-group col-md-2">
            <label for="inputPrice">Price</label>
            <input type="text" class="form-control" id="inputPrice" v-model="product.Price">
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">in stock</label>
          </div>
        </div>
        <!-- custom event 
        
        -->
        <UploadImage @clicked="onClickChild"/>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import UploadImage from "../components/UploadImage.vue";
export default {
  name: "EditProduct",
  components: {
    UploadImage
  },
  data() {
    return {
      product: null,
      another: null,
      feedback: null,
      slug: null,
      urlImg: null
    };
  },
  methods: {
    onClickChild(value) {
      console.log(`value url from custom event ${value}`); // someValue
      this.urlImg = value;
    },
    editProduct() {
      if (this.product.Name) {
        this.feedback = null;
        console.log(this.imgURL);

        // create a slug
        this.slug = slugify(this.product.Name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // update product in firestore
        db.firestore()
          .collection("Product")
          .doc(this.product.id)
          .update({
            Name: this.product.Name,
            slug: this.slug,
            Color: this.product.Color,
            Image: this.urlImg,
            Price: this.product.Price
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a product Name";
      }
    }
  },
  created() {
    let ref = db
      .firestore()
      .collection("Product")
      .where("slug", "==", this.$route.params.product_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.product = doc.data();
        this.product.id = doc.id;
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  position: absolute;
  top: 2em;
  left: 10%;
  width: 50%;
  margin-left: 25%;
  margin-top: 60px;
}
.imageProduct {
  max-width: 200px;
}
</style>
