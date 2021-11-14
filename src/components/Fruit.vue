<template>
  <div>
    <v-card v-if="!editFruit" :loading="loading">
      <template slot="progress">
        <v-progress-linear
          :color="fruit.color"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="fruit.image">
        <div
          v-if="expired"
          style="
            padding: 0.2em;
            border-radius: 0.2em;
            background-color: rgb(100, 100, 100, 0.3);
            font-size: x-large;
            color: red;
          "
        >
          Expired
        </div>
        <div
          v-else
          style="
            padding: 0.2em;
            border-radius: 0.2em;
            background-color: rgb(150, 150, 150, 0.3);
            font-size: x-large;
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
          color="orange lighten-2"
          text
          @click="$store.dispatch('deleteFruit', fruit.id)"
        >
          Eat
        </v-btn>
        <v-btn color="orange lighten-2" text @click="editFruit = true">
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
          color="orange lighten-2"
          text
          @click="$store.dispatch('deleteFruit', fruit.id)"
          style="color: red"
          >Discard</v-btn
        >
        <v-btn color="orange lighten-2" text @click="editFruit = true">
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
    <EditFruit
      v-else
      :edit-fruit.sync="editFruit"
      :fruit-to-edit.sync="fruitComp"
    />
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
    editFruit: false,
    expired: false,
    expires: "",
  }),
  mounted() {
    this.setExpirationDate();
  },
  computed: {
    fruitComp: {
      get() {
        return this.fruit;
      },
      set(val) {
        this.fruit = val;
      },
    },
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