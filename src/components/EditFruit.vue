<template>
  <div>
    <v-form v-model="fruit">
      <v-container>
        <v-row>
          <v-card style="width: 100%">
            <v-col cols="12" md="12">
              <v-text-field
                v-model="firstname"
                :counter="10"
                label="Fruit name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                name="input-7-1"
                label="Description"
                value=""
              ></v-textarea>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "EditFruit",
  props: {
    fruit: Object,
  },
  data: () => ({
    loading: false,
    show: false,
  }),
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>