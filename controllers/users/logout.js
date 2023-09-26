const { Users } = require("../../models/userModel");

// 3 контролер пошук айди юз разлогіненн
const logout = async (req, res) => {
    const { _id } = req.user;
    // видаляння токену з бази
    await Users.findByIdAndUpdate(_id, { token: "" });
  
    res.status(204).json();
  };

  module.exports = logout
