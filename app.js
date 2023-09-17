const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// для пошуку .енв з top secreat
 require ('dotenv').config();

const contactsRouter = require("./routes/api/contacts");
const app = express();
// виводити в консоль повну чи скорочену інфу про запит
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// ******************4
// const authRouter = require("./routes/api/users");
// ********************4
app.use(logger(formatsLogger));
app.use(cors());
//  м/в для читання боді
app.use(express.json());

app.use("/api/contacts", contactsRouter);
// ****************************************4
// все на юсерз через аусроутер
// app.use("/api/users", authRouter);
// ****************************************4


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробник помилок для next(error)
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
