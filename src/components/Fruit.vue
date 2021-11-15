<template>
  <div>
    <v-card v-if="!fruit.props.isEdit" :loading="loading">
      <template slot="progress">
        <v-progress-linear
          :color="fruit.color"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="fruit.image || noImage">
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
          Expired
        </div>
        <div
          v-else
          style="
            padding: 0.3em;
            border-radius: 0.2em;
            background-color: rgb(200, 200, 200, 0.3);
            font-size: x-large;
            float: right;
          "
          :style="{ color: fruit.color }"
        >
          {{ fruit.taste }}
        </div>
      </v-img>

      <v-card-actions>
        <v-card-title>{{
          fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1)
        }}</v-card-title>
        <v-spacer></v-spacer>
        <div>{{ fruit.price }} €</div>
      </v-card-actions>

      <v-card-actions v-if="!expired">
        <v-btn
          text
          elevation="3"
          color="green lighten-2"
          @click="$store.dispatch('deleteFruit', fruit.id)"
        >
          Eat
        </v-btn>
        <v-btn
          text
          elevation="3"
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
          text
          elevation="3"
          color="red lighten-2"
          @click="$store.dispatch('deleteFruit', fruit.id)"
          >Discard</v-btn
        >
        <v-btn
          text
          elevation="3"
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

export default {
  name: "Fruit",
  props: {
    fruit: Object,
  },
  components: {
    EditFruit,
  },
  data: () => ({
    loading: false,
    show: false,
    expired: false,
    expires: "",
    noImage: "https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg",
  }),
  mounted() {
    this.setExpirationDate();
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
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
  },
};
</script>