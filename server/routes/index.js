const express = require("express");
const router = express.Router();
const hotels = require("../model/hotels");

/* GET all data. */
router.get("/hotels", function (req, res, next) {
  res.send(hotels.getAllHotels());
});

router.get("/hotels/:id", function (req, res, next) {
  res.send(hotels.getDetail(req.params.id));
});

router.delete("/hotels/:id", function (req, res, next) {
  res.send(hotels.delHotel(req.params.id));
});

router.patch("/hotels/:id", function (req, res, next) {
  console.log(req.params.id);
  console.table(req.body);
  res.send(hotels.updateHotel(req.params.id, req.body));
});

router.post("/feedback", function (req, res, next) {
  res.send(hotels.postFeedback(req.body));
  console.table(req.body);
});

module.exports = router;
