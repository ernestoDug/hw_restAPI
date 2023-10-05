require("dotenv").config();

const { HttpError, sendEmail } = require("../../helpers");
const { Users } = require("../../models/userModel");

const { BASE_URL } = process.env;

const emailResending = async (req, res) => {
  const { email } = req.body;
  // пошук за имейлом
  const user = await Users.findOne({ email });

  if (!user) throw HttpError(401, "Email not found");

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<h5>hi, friend, <a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}"> please click for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = emailResending;