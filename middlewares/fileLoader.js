const multer = require("multer");
const path = require("path");
// шлях до тим час папки
const tempDir = path.join(__dirname, "..", "tmp");
// об'єкт налаштувань для м/в
const multerConfig = multer.diskStorage({
  destination: tempDir,
  // filename зберігає file (що прийшов)
  filename: (req, file, cb) => {
    // а у сі бі переуменування того що прийшло або оригинальне ім₴я
    cb(null, file.originalname);
  },
});
// м/в
const fileLoader = multer({ storage: multerConfig });

module.exports = fileLoader;
