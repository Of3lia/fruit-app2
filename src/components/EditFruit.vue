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
                rows="1"
                auto-grow
                v-model="fruit.description"
                required
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
                required
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
        <v-btn color="orange lighten-2" text @click="save()"> Save </v-btn>
        <v-btn color="orange lighten-2" text @click="cancel()"> Cancel </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

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
      fruitBeforeEdit: {},
    };
  },
  mounted() {
    if (this.fruitToEdit) {
      this.isEdit = true;
      this.fruit = this.fruitToEdit;
      this.fruitBeforeEdit = Object.assign({}, this.fruitToEdit);
    }
  },
  methods: {
    save() {
      if (this.isEdit) {
        this.$store.dispatch("editFruit", this.fruit);
      } else {
        this.$store.dispatch("createFruit", this.fruit);
      }
    },
    cancel() {
      if (this.isEdit) {
        Object.assign(
          this.$store.state.fruits.find((x) => x.id === this.fruit.id),
          this.fruitBeforeEdit
        );
      }
      this.$emit("update:editFruit", false);
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

