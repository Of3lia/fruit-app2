<template>
  <div>
    <span v-for="(fruit, i) of fruits" v-bind:key="i">
      <div v-if="fruit.id">{{ fruit }}</div>
      <br />
    </span>

    <Fruit />
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

