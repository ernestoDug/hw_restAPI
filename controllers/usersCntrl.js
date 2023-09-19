const bcrypt = require("bcrypt");

const { Users } = require("../models/userModel");
const { wrapperCntrl, HttpError } = require("../helpers");

// контролер регістрації
const register = async (req, res) => {
    // const { email, password } = req.body; 
    // const user = await User.findOne({ email });
  
    // if (user) throw HttpError(409, "Email in use");
  
    // const hashPass = await bcrypt.hash(password, 10);
    // стоврення кор
    // const newUser = await Users.create({ ...req.body, password: hashPass });
    const newUser = await Users.create(req.body);
    
    res.status(201)
    // у відповідь
    .json({
      email: newUser.email,
      password: newUser.password
    })

      // user: {
      //   email: newUser.email,
      //   subscription: newUser.subscription,
      // },
    // });
  };

// контролер логинизації




// const login = async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
//     if (!user) throw HttpError(401, "Email or password is wrong");
  
//     const passCompare = await bcrypt.compare(password, user.password);
//     if (!passCompare) throw HttpError(401, "Email or password is wrong");
  
//     const payload = {
//       id: user._id, 
//     };
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
//     await User.findOneAndUpdate(user._id, { token });
  
//     res.json({
//       token,
//       user: {
//         email: user.email,
//         subscription: user.subscription,
//       },
//     });
//   };





//   wrapperCntrl для помилок
  module.exports = {
    // login: wrapperCntrl(login),
    register: wrapperCntrl(register),
    // getContatAdd: wrapperCntrl(getContatAdd),
    // getRemoveContact: wrapperCntrl(getRemoveContact),
    // getContactUpdate: wrapperCntrl(getContactUpdate),
    // updateStatusContact : wrapperCntrl(updateStatusContact ),
  };