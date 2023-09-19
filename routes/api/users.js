const express = require("express");
const { bodyValidator } = require("../../middlewares");
const { userSchemas } = require("../../models/userModel");

const controls = require("../../controllers/usersCntrl");
const router = express.Router();
// 1рег
router.post( 
  "/register",
  bodyValidator(userSchemas.registerSchema),
  controls.register 
); 



// router.post("/login", bodyValidator(userSchemas.loginSchema), 
// controls.login); 

// router.post("/logout", authenticate, controls.logout);

// router.get("/current", authenticate, controls.getCurrent);

// router.patch(
//   "/",
//   authenticate,
//   bodyValidator(userSchemas.updSubscriptionSchema),
//   controls.updateSubscription
// );

module.exports = router;