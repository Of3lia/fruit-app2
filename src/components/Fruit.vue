<template>
  <div>
    <v-card :loading="loading">
      <template slot="progress">
        <v-progress-linear
          :color="fruit.color"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="fruit.image"></v-img>

      <v-card-actions>
        <v-card-title>{{
          fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1)
        }}</v-card-title>
        <v-spacer></v-spacer>
        <div>$ 550</div>
      </v-card-actions>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> Eat </v-btn>
        <v-btn color="orange lighten-2" text> Modify </v-btn>
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ fruit.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Fruit",
  props: {
    fruit: Object,
  },
  data: () => ({
    loading: false,
    // selection: 1,
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

