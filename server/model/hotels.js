let hotels = require("./hotels.json");

module.exports = {
  getAllHotels() {
    return hotels;
  },
  getDetail(ID) {
    let found = hotels.find((elm) => elm.id == ID);
    return found;
  },
  delHotel(ID) {
    return (hotels = hotels.filter((elm) => elm.id != ID));
  },
  updateHotel(ID, newobj) {
    let found = hotels.find((elm) => elm.id == ID);
    if (found) {
      if (found.likes >= 0) {
        found.likes = newobj.likes;
        return true;
      } else return false;
    }
    return false;
  },
  postFeedback(feedback) {
    console.log(feedback);
  },
};
