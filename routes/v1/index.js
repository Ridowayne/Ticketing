const express = express();
const router = express.Router();
const eventRouter = require("./event.route");
const ticketRoute = require("./ticket.route");
const userRoute = require("./user.route");
router.use("/event", eventRouter);
router.use("/ticket", ticketRoute);
router.use("/user", userRoute);

module.exports = router;
