<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn class="mr-3" to="/">Home</v-btn>
      <v-btn to="/about">Impressum</v-btn>
    </v-app-bar>

    <v-main>
      <router-view
        :hotels="hotels"
        @delHotel="delHotel"
        @Like="Like"
        @Dislike="Dislike"
        @postFeedback="postFeedback"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  components: {},

  data: () => ({
    hotels: [],
  }),
  methods: {
    async getData() {
      let res = await axios.get("http://localhost:3000/hotels");
      this.hotels = res.data;
      console.log(this.hotels);
    },
    async delHotel(item) {
      await axios.delete(`http://localhost:3000/hotels/${item.id}`);
      this.hotels = this.hotels.filter((elm) => elm.id != item.id);
    },
    async Like(hotel) {
      await axios.patch(`http://localhost:3000/hotels/${hotel.id}`, {
        likes: hotel.likes++,
      });
    },
    async Dislike(hotel) {
      await axios.patch(`http://localhost:3000/hotels/${hotel.id}`, {
        likes: hotel.likes--,
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
