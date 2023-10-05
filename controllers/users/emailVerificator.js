const { HttpError } = require("../../helpers");
const { Users } = require("../../models/userModel");
 
const emailVerificator = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");
// оновлення б/д
  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    // токен пустий щоб двічі не підтверджувати 
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = emailVerificator;