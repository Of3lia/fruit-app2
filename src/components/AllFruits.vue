<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="4"
          lg="4"
          xl="4"
          v-for="(fruit, i) in fruits"
          :key="i"
        >
          <Fruit v-if="fruit.id" :fruit="fruit" />
        </v-col>
      </v-row>
    </v-container>
    <!-- <span v-for="(fruit, i) of fruits" v-bind:key="i">
      <div v-if="fruit.id"><Fruit /></div>
      <br />
    </span> -->
  </div>
</template>

<script>
import Fruit from "@/components/Fruit.vue";
import { mapState } from "vuex";
export default {
  name: "AllFruits",
  components: {
    Fruit,
  },
  mounted() {
    this.$store.dispatch("loadFruits");
  },
  computed: mapState(["fruits"]),
};
</script>

