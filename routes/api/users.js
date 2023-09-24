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
router.post("/login", bodyValidator(userSchemas.loginSchema), controls.login);
// 3 логаут розлогінення
router.post("/logout", authenticator, controls.logout);
// 4 данні про користувача щоб знову не логінитись
router.get("/current", authenticator, controls.getCurrent);
// 5 оновлення підписки користувача
router.patch(
  "/",
  authenticator,
  bodyValidator(userSchemas.updateSubsSchema),
  controls.updateSubscr
);

module.exports = router;
