const express = require("express");
const {
  bodyValidator,
  authenticator, 
  fileLoader,
} = require("../../middlewares");

const { userSchemas } = require("../../models/userModel");
const controls = require("../../controllers/users");
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
// 6 оновлення авки
// в сінгле вказуємо поле боді для файлу 
// багато в одному полі fileLoader.array("поле", число файлв)
// багато полів fileLoader.fields[{name: "pole", maxCount: skilki }, {і тд}]
router.patch(
  "/avatars",
  authenticator,
  fileLoader.single("avatar"),
  controls.userAvatar
);
// 7 для відправки имейла користувачу 
// по verificationToken шукається користувач в User 
router.get("/verify/:verificationToken", controls.emailVerificator);
// 8 для повторної відрпавки з посиланням веріфікації
router.post(
  "/verify",
  bodyValidator(userSchemas.emailSchema),
  controls.emailResending
);

module.exports = router;  
