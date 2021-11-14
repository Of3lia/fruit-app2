<template>
  <div>
    <v-card>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="fruit.name"
                label="Fruit name"
                required
              ></v-text-field>
            </v-col>

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

            <v-col v-if="false" cols="8">
              <v-color-picker></v-color-picker>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Description"
                v-model="fruit.description"
                required
              ></v-textarea>
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
  methods: {},
};
</script>