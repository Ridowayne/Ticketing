const express = express();
const router = express.Router();
const appRoute = require("./v1/index");
router.use("/v1", appRoute);

module.exports = router;
