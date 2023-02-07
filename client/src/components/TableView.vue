<template>
  <div>
    <v-card elevation="0">
      <v-card-title
        >Hotels
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search for the name of the hotel or the country"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :items="hotels" :headers="headers" :search="search">
        <template v-slot:item.picture="{ item }">
          <v-img
            width="200"
            :src="`http://localhost:3000/images/${item.picture}`"
          ></v-img>
        </template>
        <template v-slot:item.detail="{ item }">
          <v-btn text color="primary" :to="`/detail/${item.id}`">
            <v-icon class="mr-2" small>mdi-information</v-icon> Detail</v-btn
          >
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2" v-if="!item.hasSpecial" @click="delHotel(item)"
            >mdi-delete</v-icon
          >
          <span v-else class="error--text">Too special to get deleted!</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Image",
          align: "start",
          sortable: false,
          value: "picture",
          filterable: false,
        },
        { text: "Name", value: "name" },
        { text: "Country", value: "country" },
        { text: "Likes", value: "likes", filterable: false },
        {
          text: "Detail Page",
          value: "detail",
          sortable: false,
          filterable: false,
        },
        { text: "Action", value: "action", sortable: false, filterable: false },
      ],
      search: "",
    };
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

<style lang="scss" scoped></style>
