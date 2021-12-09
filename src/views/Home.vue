<template>
  <div class="home">
    <AllFruits />
  </div>
</template>

<script>
// @ is an alias to /src
import AllFruits from "@/components/AllFruits.vue";

export default {
  name: "Home",
  components: {
    AllFruits,
  },
};
</script>
