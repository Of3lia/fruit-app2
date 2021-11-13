<template>
  <div>
    <v-card id="isAdd">
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
  </div>
</template>

<script>
export default {
  name: "AddFruitButton",
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