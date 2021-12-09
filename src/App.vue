<template>
  <v-app>
    <v-app-bar app color="orange lighten-2" dark>
      <div
        @click="goHome()"
        class="d-flex align-center"
        style="cursor: pointer; font-size: x-large; user-select: none"
      >
        <v-icon x-large>mdi-fruit-pineapple</v-icon>
        Fruits-App
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <!-- <span class="mr-2">Latest Release</span> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    goHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
