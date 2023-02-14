const express = express();
const router = express.Router();
const ticketController = require("../../controllers/ticket.controler");
router.route("/reserveTicket").post(ticketController.bookTicket);
router.route("/id").get(ticketController.getOneTicket);
router.route("/myTicket").get(ticketController.getUserTicket);
router.route("/reservedTickets").get(ticketController.getBokedTicket);
module.exports = router;
