<template>
  <div>
    <span v-for="(fruit, i) of fruits" v-bind:key="i">
      <div v-if="fruit.id">{{ fruit }}</div>
      <br />
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  mounted() {
    this.$store.dispatch("loadFruits");
  },
  computed: mapState(["fruits"]),
};
</script>

