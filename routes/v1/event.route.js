const express = express();
const router = express.Router();
const eventRouter = require("../../controllers/event.controler");
router.route("/newEvent").get(eventRouter.createEvent);
router.route("/Events").get(eventRouter.allEvents);
router.route("/availableEvents").get(eventRouter.availableEevents);
router.route("/:id").get(eventRouter.getEvent);
router.route("/myEvents").get(eventRouter.organiserEvents);
router.route("/deleteEvent").get(eventRouter.deleteevent);
module.exports = router;
