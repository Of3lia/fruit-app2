<template>
  <div>
    <v-card :loading="fruit.props.isLoading">
      <template slot="progress">
        <v-progress-linear
          :color="fruit.color"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-form v-model="valid">
        <v-container>
          <v-row>
            <!-- Name -->
            <v-col cols="8">
              <v-text-field
                v-model="fruit.name"
                label="Fruit name"
                :rules="rules.name"
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
                :rules="rules.required"
                required
              ></v-text-field>
            </v-col>

            <!-- Description -->
            <v-col cols="12">
              <v-textarea
                label="Description"
                rows="1"
                auto-grow
                v-model="fruit.description"
              ></v-textarea>
            </v-col>

            <!-- Image -->
            <!-- <v-col cols="3">
              <v-file-input prepend-icon="mdi-camera"></v-file-input>
            </v-col> -->

            <!-- Image URL -->
            <v-col cols="12">
              <v-text-field
                v-model="fruit.image"
                label="Image URL"
              ></v-text-field>
            </v-col>

            <!-- Expires -->
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
                placeholder="Nice"
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
              <v-icon :style="{ color: fruit.color }" x-large
                >mdi-fruit-pineapple</v-icon
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn elevation="3" text color="green lighten-2" @click="save()">
          Save
        </v-btn>
        <v-btn elevation="3" text color="orange lighten-2" @click="cancel()">
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
    fruit: {
      default() {
        return {
          isFruit: true,
          name: "",
          price: "",
          taste: "",
          color: "rgb(50,120,250)",
          description: "",
          expires: "",
          image: "",
          props: { isLoading: false, isEdit: false },
        };
      },
      type: Object,
    },
  },
  data() {
    return {
      isCreate: true,
      fruitClone: {},
      valid: false,
      rules: {
        name: [
          (v) => !!v || "Name is required",
          (v) => v.length <= 30 || "Name must be less than 30 characters",
        ],
        required: [(v) => !!v || "Price is required"],
      },
    };
  },
  mounted() {
    if (this.fruit) {
      this.fruitClone = Object.assign({}, this.fruit);
      this.isCreate = false;
    }
  },
  methods: {
    save() {
      if (this.valid) {
        this.fruit.props.isLoading = true;
        if (this.fruit.props.isEdit) {
          this.$store.dispatch("editFruit", this.fruit);
        } else {
          this.$store.dispatch("createFruit", this.fruit);
          // this.$emit("update:createFruit", false);
        }
      }
    },
    cancel() {
      if (!this.isCreate) {
        this.$emit("update:createFruit", false);
        Object.assign(this.fruit, this.fruitClone);
      }
      this.fruit.props.isEdit = false;
    },
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
};
</script>