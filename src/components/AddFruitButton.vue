<template>
  <div>
    <v-card
      v-if="!createFruit"
      id="isAdd"
      @click="createFruit = true"
      elevation="5"
    >
      <v-icon
        id="add-button"
        style="
          font-size: 100px;
          color: white;
          width: 100%;
          height: 100%;
          vertical-align: middle;
        "
        x-large
        >mdi-plus-thick</v-icon
      >
    </v-card>
    <EditFruit v-else />
  </div>
</template>

<script>
import EditFruit from "./EditFruit.vue";
export default {
  name: "AddFruitButton",
  components: { EditFruit },
  computed: {
    createFruit: {
      get() {
        return this.$store.state.createFruit;
      },
      set(val) {
        this.$store.state.createFruit = val;
      },
    },
  },
};
</script>

<style scoped>
#isAdd:hover {
  transition: 1s;
  background: rgb(165, 165, 165);
  cursor: pointer;
}
#isAdd {
  height: 383px;
  transition: 1s;
  background: rgb(196, 196, 196);
}
#add-button:hover {
  font-size: 150px !important;
}
</style>