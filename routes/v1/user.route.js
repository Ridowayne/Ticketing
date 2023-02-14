const express = express();
const router = express.Router();
const userController = require("../../controllers/user.controler");
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
