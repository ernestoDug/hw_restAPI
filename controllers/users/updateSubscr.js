const { HttpError } = require("../../helpers");

// 5 зміна підписки
const updateSubscr = async (req, res) => {
    const { _id } = req.user;
    if (!req.body) throw HttpError(400, "missing field subscription");
    const { Users } = require("../../models/userModel");
   
    const { email, subscription } = await Users.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!email || !subscription) throw HttpError(404, "Not found");
  
    res.status(201).json({ email, subscription });
  };
  

  module.exports = updateSubscr