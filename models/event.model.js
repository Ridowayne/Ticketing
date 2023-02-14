const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventOrganiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  organiserEmail: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date_Time: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  seatsBoked: {
    type: Number,
    default: 0,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
