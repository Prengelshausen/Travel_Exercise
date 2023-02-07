<template>
  <div class="home">
    <v-container>
      <table-view :hotels="hotels" @delHotel="delHotel"></table-view>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TableView from "@/components/TableView.vue";
export default {
  name: "Home",
  components: {
    TableView,
  },
  props: {
    hotels: {
      type: Array,
    },
  },
  methods: {
    delHotel(item) {
      this.$emit("delHotel", item);
    },
  },
};
</script>
