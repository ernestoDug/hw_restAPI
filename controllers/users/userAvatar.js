const { HttpError } = require("../../helpers");
const { Users } = require("../../models/userModel");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
// новий шлях*
const avatarDir = path.join(__dirname, "..", "..", "public", "avatars");
// контролер авки
const userAvatar = async (req, res) => {
  const { _id } = req.user;
  // з реквесту старий шлях та ім'я приходу
  const { path: tempUpload, originalname } = req.file;

  if (!req.file) throw HttpError(400, "missing field avatar");

  await Jimp.read(tempUpload).then((img) =>
    img.resize(250, 250).write(`${tempUpload}`)
  );
  const fileName = `${_id}_${originalname}`;
  // нове місце файла
  const resultUpload = path.join(avatarDir, fileName);
  // переміщення файлу з старого місця на пмж*
  await fs.rename(tempUpload, resultUpload);
  // свтілини пмж зберігати на клаудері (має нпм пакет)
  // шлях до авки папка
  const avatarURL = path.join("avatars", fileName);
  // додавання авочки до юзера
  await Users.findByIdAndUpdate(_id, { avatarURL });

  if (!avatarURL) throw HttpError(404, "Not found");

  res.json({ avatarURL });
};

module.exports = userAvatar;
