<template>
  <div>
    <v-container>
      <v-btn to="/" class="pa-0" text>
        <v-icon>mdi-arrow-left</v-icon>
        Back
      </v-btn>
      <v-row align="center">
        <v-col md="4">
          <h1>{{ hotel.name }}</h1>
        </v-col>
        <v-col md="2">
          <v-icon class="mr-2" @click="Like(hotel)">mdi-thumb-up</v-icon>
          <v-icon @click="Dislike(hotel)">mdi-thumb-down</v-icon>
          <span class="ml-4"> {{ hotel.likes }} </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="5" xs="12">
          <v-img
            :src="`http://localhost:3000/images/${hotel.picture}`"
            contain
          ></v-img>
        </v-col>
        <v-col md="7" xs="12">
          <v-card elevation="0">
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <span class="font-weight-bold">Country</span>
                </v-col>
                <v-col cols="4">
                  {{ hotel.country }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <span class="font-weight-bold">Street</span>
                </v-col>
                <v-col cols="4">
                  {{ hotel.street }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <span class="font-weight-bold">Email</span>
                </v-col>
                <v-col cols="4">
                  {{ hotel.email }}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" class="mt-5">
                  <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on"
                        ><v-icon class="mr-2">mdi-email</v-icon> Send
                        Feedback</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Send Feedback to the Hotel</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-text-field
                            label="Firstname*"
                            v-model="firstname"
                            :rules="firstnameRules"
                            :counter="20"
                            required
                          ></v-text-field>

                          <v-text-field
                            label="Lastname*"
                            v-model="lastname"
                            :rules="lastnameRules"
                            :counter="50"
                            required
                          ></v-text-field>

                          <v-text-field
                            label="Email*"
                            v-model="email"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                          <v-textarea
                            label="Comment*"
                            v-model="comment"
                          ></v-textarea>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close()">
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="
                            postFeedback(firstname, lastname, email, comment)
                          "
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hotel: {},
      dialog: false,
      firstname: "",
      lastname: "",
      firstnameRules: [
        (v) => !!v || "Firstname is required",
        (v) => v.length <= 20 || "Firstname must be less than 20 characters",
      ],
      lastnameRules: [
        (v) => !!v || "Lastname is required",
        (v) => v.length <= 50 || "Lastname must be less than 50 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      comment: "",
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    Like(hotel) {
      this.$emit("Like", hotel);
    },
    Dislike(hotel) {
      this.$emit("Dislike", hotel);
    },
    close() {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.comment = "";
      this.dialog = false;
    },
    async postFeedback() {
      await axios.post("http://localhost:3000/feedback", {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        comment: this.comment,
      });
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.comment = "";
      this.dialog = false;
    },
  },
  async created() {
    let res = await axios.get(`http://localhost:3000/hotels/${this.id}`);
    this.hotel = res.data;
  },
};
</script>

<style lang="scss" scoped></style>
