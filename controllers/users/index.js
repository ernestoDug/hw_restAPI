const { wrapperCntrl } = require("../../helpers");

const userAvatar = require("./userAvatar");
const  register =  require("./register");
const  login =  require("./login");
const  logout =  require("./logout");
const  getCurrent =  require("./getCurrent");
const  updateSubscr =  require("./updateSubscr");



// wrapperCntrl відловлює помилки замість сотні трайкетчів
module.exports = {
    userAvatar: wrapperCntrl(userAvatar),
    register: wrapperCntrl(register),
    login: wrapperCntrl(login),
    logout: wrapperCntrl(logout),
    getCurrent: wrapperCntrl(getCurrent),
    updateSubscr: wrapperCntrl(updateSubscr),



};
