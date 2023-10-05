// функція листоноша
require("dotenv").config();
const nodemailer = require("nodemailer");


const { META_EMAIL, META_PASSWORD } = process.env;
// обєкт нашаштувань нодемейлеру,
const nademailerConfig = {
  host: 	"smtp.meta.ua",
  port: 465,
  // чи треба шифрофка
  secure: true,
  auth: {
    user: META_EMAIL,
    // тільки пасс без варіантів
    pass: META_PASSWORD,
  },
};
// доставшик пошти
const transport = nodemailer.createTransport(nademailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: META_EMAIL };
  
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;