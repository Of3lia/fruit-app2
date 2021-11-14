<template>
  <div>
    <v-container>
      <v-row>
        <template v-for="(fruit, i) in fruits">
          <v-col v-if="fruit.id" xs="12" sm="6" md="6" lg="4" xl="3" :key="i">
            <Fruit :fruit="fruit" />
          </v-col>
        </template>

        <v-col xs="12" sm="6" md="6" lg="4" xl="3">
          <AddFruitButton />
        </v-col>

        <v-col v-if="createFruit" xs="12" sm="6" md="6" lg="4" xl="3">
          <EditFruit />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Fruit from "@/components/Fruit.vue";
import AddFruitButton from "@/components/AddFruitButton.vue";
import EditFruit from "@/components/EditFruit.vue";
import { mapState } from "vuex";
export default {
  name: "AllFruits",
  components: {
    Fruit,
    AddFruitButton,
    EditFruit,
  },
  mounted() {
    this.$store.dispatch("loadFruits");
  },
  computed: mapState(["fruits"]),
  data() {
    return {
      createFruit: false,
    };
  },
};
</script>
