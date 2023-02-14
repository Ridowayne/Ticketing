const Event = require("../models/event.model");
// getall, create, readOne update, delete/archive

exports.createEvent = async (req, res, next) => {
  try {
    if (req.user.userType !== "organiser")
      return res
        .status(404)
        .json({ message: "You are not authorized to perform this action" });

    const newEvent = await Event.create(req.body);
    return res.status(201).json({
      status: "success",
      message: "created successfully",
      data: newEvent,
    });
  } catch (error) {
    return next;
  }
};

exports.availableEevents = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const allEvents = await Event.find({ date_time: { $gt: currentDate } });
    return res.status(200).json({
      status: "success",
      message: "fetched successfully",
      data: allEvents,
      count: allEvents.length,
    });
  } catch (error) {
    console.log(error);
    return next;
  }
};

exports.allEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find().limit().sort();
    return res.status(200).json({
      status: "success",
      message: "fecthed successfully",
      data: allEvents,
      count: allEvents.length,
    });
  } catch (error) {}
};
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    return res.status(200).json({
      status: "success",
      message: "fecthed successfully",
      data: event,
    });
  } catch (error) {
    return next(error);
  }
};
exports.organiserEvents = async (req, res, next) => {
  try {
    const myEvents = await Event.find({ eventOrganiser: req.user.id })
      .limit()
      .sort();
    return res.status(200).json({
      status: "success",
      message: "fetched successfully",
      data: myEvents,
      count: myEvents.length,
    });
  } catch (error) {}
};

exports.deleteevent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).json({
      status: "success",
      message: "deleted successfully",
    });
  } catch (error) {}
};

// exports.updateEvent = async (req, res) => {
//   try {

//     const event = await Event.findOneAndUpdate({});
//   } catch (error) {}
// };
