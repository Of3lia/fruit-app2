<template>
  <div>
    <v-card
      v-if="!fruit.props.isEdit"
      :loading="fruit.props.isLoading"
      elevation="5"
    >
      <template slot="progress">
        <v-progress-linear
          :color="fruit.color"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        style="cursor: pointer"
        @click="redirect()"
        :height="imgHeight"
        :src="
          fruit.image ||
          'https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg'
        "
      >
        <div
          v-if="expired"
          style="
            top: 50%;
            text-align: center;
            padding: 0.3em;
            border-radius: 0.2em;
            background-color: rgb(200, 200, 200, 0.3);
            font-size: x-large;
            color: red;
          "
        >
          Expired {{ expires }}
        </div>
      </v-img>
      <v-row>
        <v-col>
          <v-card-title>
            {{ fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1) }}
          </v-card-title>

          <v-card-subtitle :style="{ color: fruit.color }">
            <i> "{{ fruit.taste }}" </i>
          </v-card-subtitle>
        </v-col>
        <v-col>
          <v-card-text style="display: inline-block">
            <div style="text-align: right">{{ fruit.price }} €</div>
          </v-card-text>
        </v-col>
      </v-row>

      <v-card-actions v-if="!expired">
        <v-btn
          text
          :loading="fruit.props.isLoading"
          elevation="2"
          color="green lighten-2"
          @click="deleteFruit()"
        >
          Eat
        </v-btn>
        <v-btn
          text
          elevation="2"
          color="orange lighten-2"
          @click="fruit.props.isEdit = true"
        >
          Modify
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn style="right: 40px" icon @click="show = !show">
          Description
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-actions v-else>
        <v-btn
          :loading="fruit.props.isLoading"
          text
          elevation="2"
          color="red lighten-2"
          @click="deleteFruit()"
          >Discard</v-btn
        >
        <v-btn
          text
          elevation="2"
          color="orange lighten-2"
          @click="fruit.props.isEdit = true"
        >
          Modify
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn style="right: 40px" icon @click="show = !show">
          Description
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            {{ fruit.description }}
          </v-card-text>
          <v-card-text>
            Expiration date:
            <span>
              {{ expires }}
            </span>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <EditFruit v-else :fruit="fruit" />
  </div>
</template>

<script>
import EditFruit from "./EditFruit.vue";
import moment from "moment";
import axios from "axios";

export default {
  name: "Fruit",
  props: {
    fruit: {
      default() {
        return {
          id: "",
          isFruit: true,
          name: "",
          price: "",
          taste: "",
          color: "",
          description: "",
          expires: "",
          image: "",
          props: {
            empty: true,
            isLoading: false,
            isEdit: false,
          },
        };
      },
      type: Object,
    },
  },
  components: {
    EditFruit,
  },
  data: () => ({
    show: false,
    expired: false,
    expires: "",
    routeId: null,
    imgHeight: "250",
  }),
  mounted() {
    this.setExpirationDate();
    if (this.fruit.props.empty) {
      this.imgHeight = "70vh";
      this.routeId = this.$route.params.id;
      this.getFruit(this.routeId);
    }
  },
  methods: {
    deleteFruit() {
      this.fruit.props.isLoading = true;
      this.$store.dispatch("deleteFruit", this.fruit.id).then(() => {
        setTimeout(() => {
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
        }, 1000);
      });
    },
    setExpirationDate() {
      const now = Date.now();
      const expiration = Date.parse(this.fruit.expires);
      if (expiration - now < 0) {
        this.expired = true;
      }
      this.expires = moment(String(this.fruit.expires)).format(
        "MM/DD/YYYY hh:mm"
      );
    },
    getFruit(id) {
      let fruit = this.$store.state.fruits.find((x) => x.id == id);
      console.log(fruit);
      this.fruit.id = fruit.id;
      this.fruit.name = fruit.name;
      this.fruit.price = fruit.price;
      this.fruit.color = fruit.color;
      this.fruit.description = fruit.description;
      this.fruit.expires = fruit.expires;
      this.fruit.taste = fruit.taste;
      this.fruit.image = fruit.image;
    },
    redirect() {
      if (!this.routeId) {
        this.$router.push("/fruit/" + this.fruit.id);
      }
    },
  },
};
</script>