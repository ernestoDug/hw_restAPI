const { Contacts } = require("../models/contactModel");
const { wrapperCntrl, HttpError } = require("../helpers");

// 1
const getContacts = async (req, res) => {
  // щоб показати лише додані книги власника
  const { _id: owner } = req.user;
  const srchParams = {
    owner,
  };
  // ПАГІНАЦІЯ
  // page / limit ключі в парамса постмена
  const { page = 1, limit = 20, favorite } = req.query;
  // скіп це пропуски с початку бази обєктів
  // ліміт скільки повернутиб скільки на сторінці буде
  // pg 1 lim 3 поверне 0*3  без пропуску перші 3
  // pg 2 lim 2 поверне (2-1)*2 з 3го
  const skip = (page - 1) * limit;

  // фільтр по обраним
  if (typeof favorite === "undefined") {
    delete srchParams.favorite;
  } else {
    srchParams.favorite = favorite;
  }
  //  повернути лише те що після {}
  ///  "{} -createdAt -updateAt" бо поверни все крім того що з мінсом як написав
  const contacts = await Contacts.find(
    srchParams,
    "name phone email favorite",
    {
      skip,
      limit,
      // ПОПЬЮЛЕЙТ для отримання доадткових даних крім айді власника
    }
  ).populate("owner", "email");
  return res.status(200).json(contacts);
};
// // 2
const getContactID = async (req, res) => {
  const { contactId } = req.params;
  const contactByid = await Contacts.findById(
    contactId,
    "name phone email favorite"
  );
  if (!contactByid) {
    throw HttpError(404, `Not found`);
  }
  res.json(contactByid);
};
// 3
const getContatAdd = async (req, res) => {
  // отримання айді власника для додавання книги
  const { _id: owner } = req.user;
  // req.user з аутентификатора

  // тепер  контакт закрілений за власником
  const newContact = await Contacts.create({ ...req.body, owner });
  return res.status(201).json(newContact);
};
// // 4
const getRemoveContact = async (req, res) => {
  const { contactId } = req.params;
  const contactRemove = await Contacts.findByIdAndRemove(contactId);
  if (!contactRemove) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};
// // 5
const getContactUpdate = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  // {new: true} для поверення одразу ноовго обекта а не старого хоча і оновленного в базі
  const contactUpdate = await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactUpdate);
};
// 6
const updateStatusContact = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const contactUpdateFavorite = await Contacts.findByIdAndUpdate(
    contactId,
    body,
    { new: true }
  );
  if (!contactUpdateFavorite) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(contactUpdateFavorite);
};

module.exports = {
  getContacts: wrapperCntrl(getContacts),
  getContactID: wrapperCntrl(getContactID),
  getContatAdd: wrapperCntrl(getContatAdd),
  getRemoveContact: wrapperCntrl(getRemoveContact),
  getContactUpdate: wrapperCntrl(getContactUpdate),
  updateStatusContact: wrapperCntrl(updateStatusContact),
};
