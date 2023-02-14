const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ticketSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [
      true,
      "The ticket must have the name of the event you are booking",
    ],
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: [
      true,
      "The ticket must have the id of the event you are booking",
    ],
  },
  organiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  nameOfBooker: {
    type: String,
    required: [true, "The ticket must have the name of the booker"],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  emialOFBooker: {
    type: String,
    required: [
      true,
      "Please provide the name of ticket of the even you want to book",
    ],
  },
  price: {
    type: Number,
  },
  ticketId: {
    type: Number,
  },
  ticketType: {
    type: String,
    enum: ["regular", "Vip", "V Vip"],
  },
  seatNumber: {
    type: Number,
  },
  pamentId: {
    type: String,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

ticketSchema.pre("save", function () {});

ticketSchema.plugin(AutoIncrement, { inc_field: ticketId });
ticketSchema.plugin(AutoIncrement, { inc_field: seatNumber });

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
