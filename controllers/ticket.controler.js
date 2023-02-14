const Ticket = require("../models/ticket.model");

exports.bookTicket = async (req, res, next) => {
  try {
    if (!req.body.eventID) {
      req.body.eventID = req.params.id;
      const event = await Event.findOne({ _id: req.params.id });
      req.body.eventName = event.eventName;
      req.body.organiserId = event.eventOrganiser;
    }
    const newTicket = await Ticket.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "created successfully",
      data: newTicket,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getBokedTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ eventID: req.params.id }).limit();
    return res.status(200).json({
      status: "success",
      message: "fetched successfully",
      data: tickets,
      count: tickets.length,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUserTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ userID: req.user.id }).limit();
    return res.status(200).json({
      status: "success",
      message: "fetched successfully",
      data: tickets,
      count: tickets.length,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getOneTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id });
    return res.status(200).json({
      status: "success",
      message: "fetched successfully",
      data: ticket,
    });
  } catch (error) {
    return next(error);
  }
};
