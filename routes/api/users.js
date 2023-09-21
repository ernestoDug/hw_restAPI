const express = require("express");
const { bodyValidator } = require("../../middlewares");
const { authenticator } = require("../../middlewares");

const { userSchemas } = require("../../models/userModel");

const controls = require("../../controllers/usersCntrl");
const router = express.Router();
// 1рег signup
router.post( 
  "/register",
  bodyValidator(userSchemas.registerSchema),
  controls.register 
); 
// 2 лог signin 
router.post(
  "/login",
  bodyValidator(userSchemas.loginSchema), 
controls.login); 
// 3 логаут видалення
router.post("/logout", authenticator, controls.logout);

router.get("/current", authenticator, controls.getCurrent);

// router.patch(
//   "/",
//   authenticate,
//   bodyValidator(userSchemas.updSubscriptionSchema),
//   controls.updateSubscription
// );

module.exports = router;