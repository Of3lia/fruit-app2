<template>
  <div>
    <v-card>
      <v-form>
        <v-container>
          <v-row>
            <!-- Name -->
            <v-col cols="8">
              <v-text-field
                v-model="fruit.name"
                label="Fruit name"
                required
              ></v-text-field>
            </v-col>

            <!-- Price -->
            <v-col cols="4">
              <v-text-field
                v-model="fruit.price"
                label="Price"
                placeholder="0.00"
                append-icon="mdi-currency-eur"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <!-- Description -->
            <v-col cols="12">
              <v-textarea
                label="Description"
                v-model="fruit.description"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Expiration time"
                v-model="expires"
                type="datetime-local"
                required
              ></v-text-field>
            </v-col>

            <!-- Taste -->
            <v-col cols="6">
              <v-text-field
                v-model="fruit.taste"
                label="Taste"
                placeholder="0.00"
                required
              ></v-text-field>
            </v-col>

            <!-- Color -->
            <v-col cols="4">
              <v-text-field
                v-model="fruit.color"
                label="Color"
                type="color"
                value="#ff0000"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-icon :style="{ color: fruit.color }" large
                >mdi-fruit-pineapple</v-icon
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn color="orange lighten-2" text> Save </v-btn>
        <v-btn
          color="orange lighten-2"
          text
          @click="$emit('update:editFruit', false)"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "EditFruit",
  props: {
    fruitToEdit: Object,
    editFruit: Boolean,
  },
  data() {
    return {
      isEdit: false,
      fruit: [],
    };
  },
  mounted() {
    if (this.fruitToEdit) {
      this.isEdit = true;
      this.fruit = this.fruitToEdit;
    }
  },
  computed: {
    expires: {
      get() {
        return moment(String(this.fruit.expires)).format("YYYY-MM-DD[T]HH:mm");
      },
      set(val) {
        this.fruit.expires = val;
      },
    },
  },
  methods: {
    // getExpirationDate(val) {
    //   return "2018-06-12T19:30";
    //   // return moment(String(val)).format("yyyy-MM-dd[T]hh:mm :ss.SSS[Z]");
    // },
  },
};
</script>